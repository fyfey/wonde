<?php

namespace App\Domain\Repo\WondeApi;

use App\Domain\Repo;
use App\Domain\Lesson;
use App\Domain\Room;
use App\Domain\Student;
use App\Domain\Employee;
use App\Models\Period;
use Illuminate\Support\Carbon;
use Wonde\Client;

function getArray(\Iterator $iterator)
{
    $temp = [];
    foreach ($iterator as $item) {
        $temp[] = $item;
    }
    return $temp;
}
function toArray($class): array
{
    return json_decode(json_encode($class), true);
}

class WondeRepo implements Repo
{
    private $client;
    private $school;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }

    public function init()
    {
        $this->school = $this->client->school(env('WONDE_SCHOOL_ID'));
    }

    public function findTeachers(): array
    {
        return getArray($this->school->employees->all());
    }

    public function findTeacher(string $teacherId)
    {
        return $this->school->employees->get($teacherId, ['classes']);
    }

    public function findRooms(): array
    {
        return getArray($this->school->rooms->all());
    }

    public function findLesson(string $id): Lesson
    {
        $lesson = $this->school->lessons->get($id, [
            'class',
            'class.students',
            'class.employees',
            'period',
            'room',
        ]);
        $class = $lesson->class->data;
        $startDate = Carbon::parse($lesson->start_at->date, $lesson->start_at->timezone);
        return new Lesson(
            $lesson->id,
            $this->startTime($startDate),
            dayNumFromStr($lesson->period->data->day), // set in a sec
            $class->name,
            $class->description,
            $startDate,
            Carbon::parse($lesson->end_at->date, $lesson->end_at->timezone),
            $lesson->period_instance_id,
            new Room($lesson->room->data->id, $lesson->room->data->name, $lesson->room->data->code),
            collect($class->students->data)->map(function ($student) {
                return new Student($student->id, $student->forename, $student->surname);
            })->toArray(),
            collect($class->employees->data)->map(function ($employee) {
                return (new Employee([
                    'externalId' => $employee->id,
                    'forename' => $employee->forename,
                    'surname' => $employee->surname,
                    'role' => $employee->meta->role,
                ]))->toJson();
            })->toArray()
        );
    }

    public function findLessons(string $teacherId, string $after, string $before): array
    {
        return collect($this->school->employees->get($teacherId, ['classes'])->classes->data)
            ->map(function ($class) use ($after, $before) {
                $fullClass = $this->fullClass($class->id, $after, $before);
                return collect($fullClass->lessons->data)->flatMap(function ($lesson) use ($fullClass) {
                    $startDate = Carbon::parse($lesson->start_at->date, $lesson->start_at->timezone);
                    return (new Lesson(
                        $lesson->id,
                        $this->startTime($startDate),
                        dayNumFromStr($lesson->period->data->day), // set in a sec
                        $fullClass->name,
                        $fullClass->description,
                        $startDate,
                        Carbon::parse($lesson->end_at->date, $lesson->end_at->timezone),
                        $lesson->period_instance_id,
                        new Room($lesson->room->data->id, $lesson->room->data->name, $lesson->room->data->code),
                        collect($fullClass->students->data)->map(function ($student) {
                            return new Student($student->id, $student->forename, $student->surname);
                        })->toArray(),
                        collect($fullClass->employees->data)->map(function ($employee) {
                            return (new Employee([
                                'externalId' => $employee->id,
                                'forename' => $employee->forename,
                                'surname' => $employee->surname,
                                'role' => $employee->meta->role
                            ]))->toJson();
                        })->toArray()
                    ))->toJson();
                });
            })->toArray();
    }

    public function findPeriods(): array
    {
        return getArray($this->school->periods->all());
    }

    public function findPeriodsLocally(): array
    {
        return Period::where('mis_id', '>', 257)->orderBy('day')->orderBy('start_time')->get()->toArray();
    }

    private function fullClass(string $classId, string $after, string $before)
    {
        $filters = [
            'lessons_start_after' => "${after} 00:00:00",
            'lessons_start_before' => "${before} 00:00:00",
        ];
        $lessons = $this->school->classes->get(
            $classId,
            [
                'students',
                'lessons',
                'lessons.period',
                'lessons.room',
                'employees',
            ],
            $filters,
        );
        return $lessons;
    }
    public function startTime(Carbon $startDate): Carbon
    {
        $today = $startDate->format('Y-m-d');
        return Carbon::parse("{$today} 09:15:00", 'Europe/London');
    }
}

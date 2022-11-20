<?php

namespace App\Domain\Repo\WondeApi;

use App\Domain\Repo;
use App\Models\Period;
use Wonde\Client;

function getArray(\Iterator $iterator) {
    $temp = [];
    foreach ($iterator as $item) {
        $temp[] = $item;
    }
    return $temp;
}
function toArray($class): array {
    return json_decode(json_encode($class), true);
}

class WondeRepo implements Repo
{
    private $client;
    private $school;

    public function __construct(Client $client) {
        $this->client = $client;
    }

    public function init() {
        $this->school = $this->client->school(env('WONDE_SCHOOL_ID'));
    }

    public function findTeachers(): array {
        return getArray($this->school->employees->all());
    }

    public function findTeacher(string $teacherId) {
        return $this->school->employees->get($teacherId, ['classes']);
    }

    public function findRooms(): array {
        return getArray($this->school->rooms->all());
    }

    public function findClasses(string $teacherId): array {
        $classes = collect($this->school->employees->get($teacherId, ['classes'])->classes->data)
            ->map(function($class) {
                $hydrated = $this->hydatedClass($class->id);
                $class->students = $hydrated->students->data;
                $class->employees = collect(toArray($hydrated->employees->data))->map(fn($e) => [
                    'surename' => $e['surname'],
                    'forename' => $e['forename'],
                    'roles' => $e['meta']['all_roles'],
                ])->toArray();
                $class->lessons = collect($hydrated->lessons->data)->map(function($lesson) {
                    return [
                    ...toArray($lesson),
                    'room' => [
                        'name' => $lesson->room->data->name,
                        'code' => $lesson->room->data->code,
                    ]
                    ];
                })->toArray();
                return $class;
            });

        return $classes->toArray();
    }

    public function findPeriods(): array {
        return getArray($this->school->periods->all());
    }

    public function findPeriodsLocally(): array {
        return Period::where('mis_id', '>', 257)->orderBy('day')->orderBy('start_time')->get()->toArray();
    }

    private function hydatedClass(string $classId) {
        return $this->school->classes->get($classId, ['students', 'lessons', 'lessons.period', 'lessons.room', 'employees']);
    }
}

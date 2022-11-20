<?php

namespace App\Console\Commands;

use App\Domain\Repo;
use App\Models\Period;
use Illuminate\Console\Command;

function toArray(\StdClass $class): array {
    return json_decode(json_encode($class), true);
}

class PopulateForTeacher extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'wonde:populate-teacher {teacherId}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update local DB with a teacher\'s classes/lessons/students';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle(Repo $repo)
    {
        $teacherId = $this->argument('teacherId');

        $classes = $repo->findClasses($teacherId);

        $lessons = collect($classes)->map(function($class) {
            return [
                'name' => $class->name,
                'description' => $class->description,
                'subject' => $class->subject,
                'lessons' => $class->lessons,
                'employees' => $class->employees,
                'students' => collect($class->students)
                    ->map(fn($student) => [
                        "id" => $student->id,
                        "forename" => $student->forename,
                        "surname" => $student->surname
                    ])
                    ->toArray(),
                'meta' => $class->meta,
            ];
        })->map(function ($class) {
            return [
                ...$class,
                'lessons' => collect($class['lessons'])->map(fn($lesson) => [
                    ...$lesson,
                    'period' => Period::where('external_id', $lesson['period']['data']['id'])->first()->toArray(),
                ])->toArray(),
            ];
        });

        dump($lessons);

        return Command::SUCCESS;
    }
}

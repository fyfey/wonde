<?php

namespace App\Domain;

use Illuminate\Support\Carbon;

interface Repo
{
    public function init();

    public function findRooms(): array;

    public function findTeachers(): array;

    public function findTeacher(string $teacherId);

    /** @return \App\Domain\Lesson[] */
    public function findLessons(string $teacherId, string $after, string $before): array;

    public function findLesson(string $id): Lesson;

    public function findPeriods(): array;

    public function findPeriodsLocally(): array;

    public function startTime(Carbon $startDat4): Carbon;
}

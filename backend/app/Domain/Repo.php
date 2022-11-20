<?php

namespace App\Domain;

interface Repo
{
    public function init();

    public function findRooms(): array;

    public function findTeachers(): array;

    public function findTeacher(string $teacherId);

    /** @return \App\Domain\Lesson[] */
    public function findLessons(string $teacherId, string $after, string $before): array;

    public function findPeriods(): array;

    public function findPeriodsLocally(): array;
}

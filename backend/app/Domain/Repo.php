<?php

namespace App\Domain;

interface Repo
{
    public function init();

    public function findRooms(): array;

    public function findTeachers(): array;

    public function findTeacher(string $teacherId);

    /**
     * @return \App\Domain\Classs[]
     */
    public function findClasses(string $teacherId): array;

    public function findPeriods(): array;

    public function findPeriodsLocally(): array;
}

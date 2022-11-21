<?php

namespace App\Domain;

use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Support\Carbon;

class Lesson implements Jsonable
{
    /** @var $externalId Wonde ID */
    private string $externalId;
    /** @var $day Day of week: {0: Mon, 1: Tue} */
    private int $day;
    /** @var $name Name from the associated class */
    private string $name;
    /** @var $description Description from the associated class */
    private string $description;
    /** @var $startAt Lesson start time */
    private Carbon $startAt;
    /** @var $endAt Lesson end time */
    private Carbon $endAt;
    /** @var $room Room the lesson is in */
    private Room $room;
    /** @var $students Array of Students in the lesson */
    private array $students;
    /** @var $employees Array of Employees in the lesson */
    private array $employees;
    /** @var $offset int Offset in blocks from srart of day */
    private int $offset;
    /** @var $length int Length of lesson in blocks */
    private int $length;

    public function __construct(
        string $externalId,
        Carbon $dayStartTime,
        int $day,
        string $name,
        string $description,
        Carbon $startAt,
        Carbon $endAt,
        int $periodInstanceId,
        Room $room,
        array $students,
        array $employees
    ) {
        $this->externalId = $externalId;
        $this->day = $day;
        $this->name = $name;
        $this->description = $description;
        $this->startAt = $startAt;
        $this->endAt = $endAt;
        $this->periodInstanceId = $periodInstanceId;
        $this->room = $room;
        $this->students = $students;
        $this->employees = $employees;

        $this->offset = $dayStartTime->diffInMinutes($startAt) / 5;
        $this->length = $startAt->diffInMinutes($endAt) / 5;
    }

    public function toJson($options = 0)
    {
        return [
            'externalId' => $this->externalId,
            'day' => $this->day,
            'name' => $this->name,
            'description' => $this->description,
            'startAt' => $this->startAt,
            'endAt' => $this->endAt,
            'periodInstanceId' => $this->periodInstanceId,
            'room' => $this->room,
            'students' => $this->students,
            'employees' => $this->employees,
            'offset' => $this->offset,
            'length' => $this->length,
        ];
    }
}

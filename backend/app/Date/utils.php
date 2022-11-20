<?php

use Illuminate\Support\Carbon;

const DAY_MAP = [
    'sunday' => Carbon::SUNDAY,
    'monday' => Carbon::MONDAY,
    'tuesday' => Carbon::TUESDAY,
    'wednesday' => Carbon::WEDNESDAY,
    'thursday' => Carbon::THURSDAY,
    'friday' => Carbon::FRIDAY,
    'saturday' => Carbon::SATURDAY,
];


if (!function_exists('dayNumFromStr')) {
    function dayNumFromStr(string $day): int
    {
        return DAY_MAP[$day];
    }
}

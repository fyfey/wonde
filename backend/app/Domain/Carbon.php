<?php

namespace App\Domain;

use Illuminate\Support\Carbon as BaseCarbon;

class Carbon extends BaseCarbon
{
    /**
     * Returns the number of "blocks". The smallest measure of
     * time the planner goes down to is 5 mins.
     * Used for offset calculations on the frontend.
     */
    public function diffInBlocks(Carbon $date): int
    {
        return floor($this->diffInMinutes($date) / 5);
    }
}

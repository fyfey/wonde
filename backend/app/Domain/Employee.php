<?php

namespace App\Domain;

use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Database\Eloquent\Concerns\HasAttributes;

class Employee implements Jsonable
{
    /**
     * I just remembered how powerful PHP traits are so
     * thought I'd include Laravel/Elowuent's hasAttributes.
     * It's very neat for creating re-usable DTO style objects.
     */
    use HasAttributes;

    public function __construct(array $attributes = [])
    {
        $this->attributes = $attributes;
    }

    public function toJson($options = 0)
    {
        return $this->attributes;
    }
}

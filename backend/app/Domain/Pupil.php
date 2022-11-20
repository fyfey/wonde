<?php

namespace App\Domain;

class Pupil {
    public readonly string $id;
    public readonly string $firstName;
    public readonly string $lastName;

    public function __construct(string $id, string $firstName, string $lastName) {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
    }
}
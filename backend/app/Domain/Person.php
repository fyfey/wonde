<?php

namespace App\Domain;

abstract class Person
{
    /** @var $externalId Wonde ID */
    public readonly string $externalId;
    /** @var $forename string Forename */
    public readonly string $forename;
    /** @var $surname string Surname */
    public readonly string $surname;

    public function __construct(
        string $externalId,
        string $forename,
        string $surname
    ) {
        $this->externalId = $externalId;
        $this->forename = $forename;
        $this->surname = $surname;
    }
}

<?php

namespace App\Domain;

class Room
{
    /** @var $externalId Wonde ID */
    public readonly string $exteralId;
    /** @var $name Name of the room */
    public readonly string $name;
    /** @var $name Room code */
    public readonly string $code;

    public function __construct(string $externalId, string $name, string $code)
    {
        $this->exteralId = $externalId;
        $this->name = $name;
        $this->code = $code;
    }
}

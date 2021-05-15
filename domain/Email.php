<?php

namespace Domain;

use Stringable;

class Email implements Stringable
{
    private function __construct(private string $value)
    {
    }

    public static function parse(string $value): ?static
    {
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            return null;
        }

        return new static($value);
    }

    public function __toString(): string
    {
        return $this->value;
    }
}

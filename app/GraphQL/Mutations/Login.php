<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use GraphQL\Error\Error;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Facades\Auth;

class Login
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args): User
    {
        /** @var StatefulGuard */
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        if (!$guard->attempt($args)) {
            throw new Error('Invalid credentials.');
        }

        /** @var User */
        $user = $guard->user();

        return $user;
    }
}

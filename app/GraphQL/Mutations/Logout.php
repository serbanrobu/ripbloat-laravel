<?php

namespace App\GraphQL\Mutations;

use App\Models\User;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Support\Facades\Auth;

class Logout
{
    /**
     * @param null $_
     * @param array<string, mixed> $args
     */
    public function __invoke($_, array $args): ?User
    {
        /** @var StatefulGuard */
        $guard = Auth::guard(config('sanctum.guard', 'web'));

        /** @var ?User */
        $user = $guard->user();
        $guard->logout();

        return $user;
    }
}

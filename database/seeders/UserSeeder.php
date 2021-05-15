<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create(['name' => 'admin', 'email' => 'admin@ripbloat.com']);

        /** @var Collection */
        $users = User::factory()->count(50)->create();

        foreach ($users as $user) {
            Task::factory()
                ->for($user, 'creator')
                ->hasAttached($users->random(rand(0, 3)), relationship: 'assignees')
                ->count(rand(0, 3))
                ->create();
        }
    }
}

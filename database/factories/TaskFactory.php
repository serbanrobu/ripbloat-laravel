<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition(): array
    {
        return [
            'creator_id' => User::factory(),
            'title' => Str::of($this->faker->sentence)->rtrim('.'),
            'description' => $this->faker->text,
        ];
    }
}

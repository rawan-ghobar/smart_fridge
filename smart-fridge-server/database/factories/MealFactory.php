<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Fridge;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Meal>
 */
class MealFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fridge_id' => Fridge::factory(),
            'title' => fake()->sentence(3),
            'description' => fake()->paragraph(),
            'calories' => fake()->randomFloat(1, 200, 700),
        ];
    }
}

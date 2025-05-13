<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Meal;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MealIngredient>
 */
class MealIngredientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'meal_id' => Meal::factory(),
            'name' => fake()->word(),
            'quantity' => fake()->randomFloat(1, 10, 200),
            'unit' => fake()->randomElement(['g', 'ml', 'pcs']),
            'calories' => fake()->randomFloat(1, 20, 300),
        ];
    }
}

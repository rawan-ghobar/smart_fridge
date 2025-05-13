<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FridgeItem>
 */
class FridgeItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fridge_id' => \App\Models\Fridge::factory(),
            'name' => fake()->randomElement(['Tomato', 'Milk', 'Eggs', 'Cheese']),
            'quantity' => fake()->randomFloat(1, 1, 5),
            'unit' => fake()->randomElement(['pcs', 'g', 'ml']),
            'calories' => fake()->randomFloat(1, 10, 100),
            'added_at' => now(),
            'expiry_date' => now()->addDays(rand(1, 14)),
        ];
    }
}

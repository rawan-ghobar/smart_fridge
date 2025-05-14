<?php

namespace App\Services;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Schemas\MealGenerationSchema;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class MealGenerationWithCaloriesService
{
    public static function generateMealWithCalorieLimit(Collection $fridgeItems, string $mealType, ?int $usercalories, ?string $userNotes = null)
    {
        $usercalories ??= Auth::user()?->daily_calories;

        $mappedItems = $fridgeItems->map(function ($item) {
        return [
            'name' => $item->name,
            'quantity' => $item->quantity,
            'unit' => $item->unit,
            'calories_per_unit' => $item->calories,
        ];
        })->toArray();

        $schema = MealGenerationSchema::createPrismSchema(
            'meal_recommendation',
            "3 meals using available quantities and returning total calories",
            [
                'meal_type'      => 'Meal type (Breakfast,Lunch, or Dinner)',
                'meal_name'      => 'Name of the recommended meal',
                'ingredients'    => 'List each ingredient with exact quantity and unit used',
                'instructions'   => 'Step by step preparation instructions',
                'total_calories' => 'Numeric total calories for the whole meal',
                'status'         => 'Complete or incomplete',
            ]
        );

        $itemsDescription = self::buildItemsDescription($mappedItems);
        $prompt= self::buildPrompt($itemsDescription, $mealType, $usercalories, $userNotes);


        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withSystemPrompt('You are a smart fridge, expert cook, and a nutrition specialist')
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }
}

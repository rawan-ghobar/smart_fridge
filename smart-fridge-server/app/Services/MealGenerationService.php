<?php

namespace App\Services;

use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Schemas\MealGenerationSchema;
use Illuminate\Support\Collection;

class MealGenerationService
{
    public static function generateMeal(string $mealType, Collection $fridgeItems)
    {
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
            "A {$mealType} meal using available quantities and returning total calories",
            [
                'meal_name'      => 'Name of the recommended meal',
                'ingredients'    => 'List each ingredient with exact quantity and unit used',
                'instructions'   => 'Step by step preparation instructions',
                'total_calories' => 'Numeric total calories for the whole meal',
            ]
        );

        $itemsDescription = self::buildItemsDescription($mappedItems);
        $prompt= self::buildPrompt($mealType, $itemsDescription);


        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withSystemPrompt('You are a smart fridge, professional cook, and a nutrition specialist')
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }


}

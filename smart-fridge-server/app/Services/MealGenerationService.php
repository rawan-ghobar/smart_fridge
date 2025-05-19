<?php

namespace App\Services;

use App\Helpers\ItemHelper;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Schemas\MealGenerationSchema;
use Illuminate\Support\Collection;

class MealGenerationService
{
    public static function generateMeal(string $mealType, Collection $fridgeItems)
    {
        $mappedItems = ItemHelper::mapFridgeItems($fridgeItems);

        $itemsDescription = ItemHelper::buildItemsDescription($mappedItems);

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

    public static function buildPrompt(string $mealType, string $itemsDescription){
            return <<<PROMPT
                    GOAL
                    Create a {$mealType} recipe using ONLY the items listed below.

                    For **each ingredient you choose**
                    - Declare the exact amount you use (it must not exceed the available quantity).
                    - Keep the same unit (convert only if absolutely necessary).
                    - Calculate the calories for that amount using the provided per‑unit value.

                    After ingredients and instructions, include:
                    total_calories = (sum of the calories for all ingredients)

                    ### Available items
                    {$itemsDescription}

                    Return the recipe **strictly as JSON** that conforms to the attached schema.
                    PROMPT;
    }
}

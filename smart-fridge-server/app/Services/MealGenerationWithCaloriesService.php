<?php

namespace App\Services;

use App\Helpers\ItemHelper;
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

        $mappedItems = ItemHelper::mapFridgeItems($fridgeItems);

        $itemsDescription = ItemHelper::buildItemsDescription($mappedItems);

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
        $prompt= self::buildPrompt($itemsDescription, $mealType, $usercalories, $userNotes);


        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withSystemPrompt('You are a smart fridge, expert cook, and a nutrition specialist')
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }

    public static function buildPrompt(string $itemsDescription, string $mealType, int $usercalories, ?string $userNotes = null){
            $notesSection = $userNotes ? "Additional Notes\n{$userNotes}\n" : '';
        return <<<PROMPT
GOAL
Create a {$mealType} recipe using **only** the items listed below, plus basic household staples (salt, pepper, oil, garlic, herbs, etc.).
Aim for **approximately {$usercalories} kcal**.

For **each ingredient you choose**
- Declare the exact amount used (must not exceed the available quantity).
- Keep the same unit (convert only if absolutely necessary).
- Show calories for that amount using the provided per‑unit value.

After the ingredients and instructions, include:
**total_calories = (sum of calories for all ingredients)**

{$notesSection}### Available items
{$itemsDescription}

Return the recipe **strictly as JSON** that conforms to the attached schema.
If a complete recipe cannot be produced (insufficient items), still return a valid JSON object with:
- status = "incomplete"
- total_calories and other fields = null
PROMPT;
    }

}

<?php

namespace App\Helpers;

class PromptHelper
{
    public static function buildMealGenerationWithCaloriesPrompt(string $itemsDescription, string $mealType, int $userCalories, ?string $userNotes = null): string
    {
        $notesSection = $userNotes ? "Additional Notes\n{$userNotes}\n" : '';

        return <<<PROMPT
GOAL
Create a {$mealType} recipe using **only** the items listed below, plus basic household staples (salt, pepper, oil, garlic, herbs, etc.).
Aim for **approximately {$userCalories} kcal**.

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

    public static function buildMealGenerationPrompt(string $mealType, string $itemsDescription){
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

    public static function buildItemRecognitionPrompt(array $detectedItems): string
    {
        $itemsList = json_encode($detectedItems, JSON_PRETTY_PRINT);
        return <<<PROMPT
You have been provided with the following detected food items and their quantities from a computer vision model:{$itemsList}
TASK:
For each item:
1. Identify the appropriate unit (e.g., 'pcs', 'slice', 'cup').
2. Estimate the approximate calories per unit.
3. Return only a JSON array with the following fields per item: name,quantity,unit,calories.
IMPORTANT RULES: Only return the JSON array, and DO NOT add any explanations.
PROMPT;
    }
}


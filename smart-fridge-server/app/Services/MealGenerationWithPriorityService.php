<?php
namespace App\Services;
use App\Helpers\ItemHelper;
use App\Helpers\PromptHelper;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Schemas\MealGenerationSchema;
use Illuminate\Support\Collection;
class MealGenerationService
{
    public static function generateMeal(string $mealType, Collection $fridgeItems, int $priorityItemId)
    {
        $mappedItems = ItemHelper::mapFridgeItems($fridgeItems);

        $priorityItemId = $fridgeItems->firstWhere('id', $priorityItemId);
        $itemsDescription = ItemHelper::buildItemsDescription($mappedItems);

        $prompt = PromptHelper::buildMealGenerationPrompt($itemsDescription, $mealType);

        $schema = MealGenerationSchema::createPrismSchema(
            'meal_recommendation',
            "A {$mealType} meal using available quantities and returning total ca lories",
            [
                'meal_name'      => 'Name of the recommended meal',
                'ingredients'    => 'List each ingredient with exact quantity and unit used',
                'instructions'   => 'Step by step preparation instructions',
                'total_calories' => 'Numeric total calories for the whole meal',
            ]
        );

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withSystemPrompt('You are a smart fridge, professional cook, and a nutrition specialist')

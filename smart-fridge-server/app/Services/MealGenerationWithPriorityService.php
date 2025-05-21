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

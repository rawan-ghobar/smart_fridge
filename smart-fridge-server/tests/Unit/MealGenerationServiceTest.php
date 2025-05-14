<?php

namespace Tests\Unit;

use App\Services\MealGenerationService;
use App\Schemas\MealGenerationSchema;
use Illuminate\Support\Collection;
use Mockery;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use Tests\TestCase;

class MealGenerationServiceTest extends TestCase
{
    public function build_items_description()
    {
        $items = [
            ['name' => 'Egg', 'quantity' => 6, 'unit' => 'pcs', 'calories_per_unit' => 70],
            ['name' => 'Milk', 'quantity' => 2, 'unit' => 'liter', 'calories_per_unit' => 500],
        ];

        $expected = "- Egg : 6 pcs available, 70 kcal per pcs\n- Milk : 2 liter available, 500 kcal per liter";

        $result = MealGenerationService::buildItemsDescription($items);

        $this->assertEquals($expected, $result);
    }

    public function build_prompt()
    {
        $mealType = 'Breakfast';
        $itemsDescription = "- Egg : 6 pcs available, 70 kcal per pcs";

        $prompt = MealGenerationService::buildPrompt($mealType, $itemsDescription);

        $this->assertStringContainsString('Create a Breakfast recipe using ONLY the items listed below', $prompt);
        $this->assertStringContainsString($itemsDescription, $prompt);
        $this->assertStringContainsString('Return the recipe **strictly as JSON**', $prompt);
    }
}

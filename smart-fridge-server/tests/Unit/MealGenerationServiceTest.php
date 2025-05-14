<?php

namespace Tests\Unit;

use App\Services\MealGenerationService;
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

}

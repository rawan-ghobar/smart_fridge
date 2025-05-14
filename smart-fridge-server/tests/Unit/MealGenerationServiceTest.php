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

    public function test_build_prompt_generates_correct_prompt()
    {
        $mealType = 'Breakfast';
        $itemsDescription = "- Egg : 6 pcs available, 70 kcal per pcs";

        $prompt = MealGenerationService::buildPrompt($mealType, $itemsDescription);

        $this->assertStringContainsString('Create a Breakfast recipe using ONLY the items listed below', $prompt);
        $this->assertStringContainsString($itemsDescription, $prompt);
        $this->assertStringContainsString('Return the recipe **strictly as JSON**', $prompt);
    }

    public function test_prism()
    {
        $fridgeItems = new Collection([
            (object)[ 'name' => 'Egg', 'quantity' => 6, 'unit' => 'pcs', 'calories' => 70 ],
        ]);

        $prismMock = Mockery::mock('overload:' . Prism::class);

        $prismMock->shouldReceive('structured')->once()->andReturnSelf();
        $prismMock->shouldReceive('using')->with(Provider::OpenAI, 'gpt-4o')->andReturnSelf();
        $prismMock->shouldReceive('withSchema')->andReturnSelf();
        $prismMock->shouldReceive('withSystemPrompt')->andReturnSelf();
        $prismMock->shouldReceive('withPrompt')->andReturnSelf();
        $prismMock->shouldReceive('asStructured')->andReturn((object)[
            'structured' => [
                'meal_name' => 'Omelette',
                'ingredients' => 'Eggs, Salt',
                'instructions' => 'Beat and fry',
                'total_calories' => 210
            ]
        ]);

        $result = MealGenerationService::generateMeal('Breakfast', $fridgeItems);

        $this->assertEquals('Omelette', $result['meal_name']);
        $this->assertEquals(210, $result['total_calories']);
    }
}

<?php

namespace Tests\Feature;

use App\Models\Fridge;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Mockery;
use App\Services\ItemService;
use App\Services\MealGenerationService;

class MealGenerationControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function test_generate_meal()
    {
        $user = User::factory()->create();
        $fridge = Fridge::factory()->create(['user_id' => $user->id]);

        $this->actingAs($user, 'api');

        $items = collect([
            (object)[ 'name' => 'Egg', 'quantity' => 5, 'unit' => 'pcs', 'calories' => 70 ],
            (object)[ 'name' => 'Milk', 'quantity' => 1, 'unit' => 'liter', 'calories' => 500 ]
        ]);
        $itemServiceMock = Mockery::mock('overload:' . ItemService::class);
        $itemServiceMock->shouldReceive('getItems')->once()->with($fridge->id)->andReturn($items);

        $mealServiceMock = Mockery::mock('overload:' . MealGenerationService::class);
        $mealServiceMock->shouldReceive('generateMeal')->once()->andReturn([
            'meal_name' => 'Omelette',
            'ingredients' => 'Egg, Milk',
            'instructions' => 'Beat eggs and cook.',
            'total_calories' => 350
        ]);

        $response = $this->postJson('/api/v0.1/meal/generate', [
            'mealType' => 'Breakfast',
            'fridgeId' => $fridge->id,
        ]);

        $response->assertOk()
                ->assertJsonStructure(['success', 'data' => ['meal_name', 'ingredients', 'instructions', 'total_calories']]);
    }

}

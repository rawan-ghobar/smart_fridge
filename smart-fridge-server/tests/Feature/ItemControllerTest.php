<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Fridge;
use App\Models\FridgeItem;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ItemControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
    }
    public function test_get_item()
    {
        $fridge = Fridge::factory()->create(['user_id' => $this->user->id]);
        $item = FridgeItem::factory()->create(['fridge_id' => $fridge->id]);

        $response = $this->actingAs($this->user, 'api')
                         ->getJson("/api/v0.1/items/getitem/{$fridge->id}/{$item->id}");

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => $item->name]);
    }
    public function test_add_item()
    {
        $fridge = Fridge::factory()->create(['user_id' => $this->user->id]);

        $data = [
            'name' => 'Milk',
            'quantity' => 2,
            'calories' => 120,
            'unit' => 'liter'
        ];

        $response = $this->actingAs($this->user, 'api')
                         ->postJson("/api/v0.1/items/addorupdateitem/{$fridge->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Item added successfully']);

        $this->assertDatabaseHas('fridge_items', ['name' => 'Milk', 'fridge_id' => $fridge->id]);
    }

    public function test_update_item()
    {
        $fridge = Fridge::factory()->create(['user_id' => $this->user->id]);
        $item = FridgeItem::factory()->create(['fridge_id' => $fridge->id]);

        $data = [
            'name' => 'Yogurt',
            'quantity' => 5,
            'calories' => 80,
            'unit' => 'pcs'
        ];

        $response = $this->actingAs($this->user, 'api')
                         ->postJson("/api/v0.1/items/addorupdateitem/{$fridge->id}/{$item->id}", $data);

        $response->assertStatus(200)
                 ->assertJsonFragment(['message' => 'Item updated successfully']);

        $this->assertDatabaseHas('fridge_items', ['id' => $item->id, 'name' => 'Yogurt']);
    }

    public function test_delete_item()
    {
        $fridge = Fridge::factory()->create(['user_id' => $this->user->id]);
        $item = FridgeItem::factory()->create(['fridge_id' => $fridge->id]);

        $response = $this->actingAs($this->user, 'api')
                         ->deleteJson("/api/v0.1/items/deleteitem/{$fridge->id}/{$item->id}");

        $response->assertStatus(200)
         ->assertJson([
             'data' => 'Item deleted successfully.',
             'success' => true
         ]);

        $this->assertDatabaseMissing('fridge_items', ['id' => $item->id]);
    }

}

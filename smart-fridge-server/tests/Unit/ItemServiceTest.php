<?php

namespace Tests\Unit;

use App\Models\Fridge;
use App\Models\FridgeItem;
use App\Services\ItemService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Tests\TestCase;

class ItemServiceTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    use RefreshDatabase;

    /** @test */
    public function add_item()
    {
        $fridge = Fridge::factory()->create();

        $request = new Request([
            'name' => 'Cheese',
            'quantity' => 1,
            'calories' => 300,
            'unit' => 'pack'
        ]);

        $result = ItemService::addOrUpdateItem($request, $fridge->id, "add");

        $this->assertEquals('Item added successfully', $result['message']);
        $this->assertDatabaseHas('fridge_items', ['name' => 'Cheese', 'fridge_id' => $fridge->id]);
    }


    public function delete_item()
    {
        $fridge = Fridge::factory()->create();
        $item = FridgeItem::factory()->create(['fridge_id' => $fridge->id]);

        $result = ItemService::deleteItem($fridge->id, $item->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('fridge_items', ['id' => $item->id]);
    }


}

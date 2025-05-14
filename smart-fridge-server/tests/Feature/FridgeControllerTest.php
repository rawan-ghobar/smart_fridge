<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Fridge;
use App\Services\FridgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class FridgeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_connect_fridge_successfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create([
            'password' => Hash::make('secretpass'),
        ]);

        $response = $this->postJson('/api/v0.1/fridge/connect', [
            'code' => $fridge->code,
            'password' => 'secretpass',
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['code' => $fridge->code]);

        $this->assertDatabaseHas('fridge_user', [
            'user_id' => $user->id,
            'fridge_id' => $fridge->id,
        ]);
    }

    public function test_get_fridges()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create();
        $user->fridges()->attach($fridge);

        $fridges = FridgeService::getFridges();

        $this->assertCount(1, $fridges);
        $this->assertEquals($fridge->id, $fridges->first()->id);
    }
}

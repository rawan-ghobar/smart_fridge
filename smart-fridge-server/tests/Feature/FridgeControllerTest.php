<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Fridge;
use App\Services\FridgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
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

    public function test_get_user_fridges()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create();
        $user->fridges()->attach($fridge);

        $response = $this->getJson('/api/v0.1/fridge/getfridges');

        $response->assertStatus(200)
                 ->assertJsonFragment(['code' => $fridge->code]);
    }

    public function test_add_fridge_successfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');


        $response = $this->postJson('/api/v0.1/fridge/addorupdate/add', [
            'name' => 'Kitchen Fridge',
            'code' => 'FR123',
            'password' => 'mypassword',
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['name' => 'Kitchen Fridge']);

        $this->assertDatabaseHas('fridges', ['code' => 'FR123']);
    }

    public function test_update_fridge_successfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create();

        $response = $this->postJson("/api/v0.1/fridge/addorupdate/{$fridge->id}", [
            'name' => 'Updated Name',
            'code' => 'FR999',
            'password' => 'newpass',
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['code' => 'FR999']);
    }

    public function test_disconnect_fridge_successfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create();
        $user->fridges()->attach($fridge);

        $response = $this->deleteJson("/api/v0.1/fridge/disconnect/{$fridge->id}");

        $response->assertStatus(200)
                ->assertJsonFragment(['data' => 'Fridge disconnected successfully.']);

        $this->assertDatabaseMissing('fridge_user', [
            'user_id' => $user->id,
            'fridge_id' => $fridge->id,
        ]);
    }
}

<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Fridge;
use App\Services\FridgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;

class FridgeServiceTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticate()
    {
        $user = User::factory()->create();
        Auth::login($user);
        return $user;
    }

    public function test_connect_success()
    {
        $this->authenticate();
        $fridge = Fridge::factory()->create(['password' => Hash::make('secretpass')]);

        $request = new Request(['code' => $fridge->code, 'password' => 'secretpass']);

        $response = FridgeService::connect($request);

        $this->assertEquals($fridge->id, $response->id);
    }

    public function test_connect_invalid_credentials()
    {
        $this->authenticate();
        Fridge::factory()->create(['code' => 'FR001', 'password' => Hash::make('pass')]);

        $request = new Request(['code' => 'wrongcode', 'password' => 'wrongpass']);

        $response = FridgeService::connect($request);

        $this->assertEquals('Invalid fridge credentials.', $response->original['message']);
    }

    public function test_get_fridges()
    {
        $user = $this->authenticate();
        $fridge = Fridge::factory()->create();
        $user->fridges()->attach($fridge);

        $fridges = FridgeService::getFridges();

        $this->assertCount(1, $fridges);
        $this->assertEquals($fridge->id, $fridges->first()->id);
    }

    public function test_add_fridge()
    {
        $this->authenticate();

        $request = new Request(['name' => 'New Fridge', 'code' => 'FR001', 'password' => 'pass']);

        $fridge = FridgeService::addOrUpdateFridge($request, 'add');

        $this->assertDatabaseHas('fridges', ['code' => 'FR001']);
        $this->assertEquals('New Fridge', $fridge->name);
    }

    public function test_update_fridge_successfully()
    {
        $this->authenticate();
        $fridge = Fridge::factory()->create();

        $request = new Request(['name' => 'Updated', 'code' => 'FR002', 'password' => 'newpass']);

        $updatedFridge = FridgeService::addOrUpdateFridge($request, $fridge->id);

        $this->assertEquals('Updated', $updatedFridge->name);
        $this->assertDatabaseHas('fridges', ['code' => 'FR002']);
    }

    public function test_update_fridge_not_found()
    {
        $this->authenticate();

        $request = new Request(['name' => 'Non-existent', 'code' => 'FR404', 'password' => 'pass']);

        $response = FridgeService::addOrUpdateFridge($request, 999);

        $this->assertEquals('Fridge not found!', $response->original['message']);
    }

    public function test_disconnect_success()
    {
        $user = $this->authenticate();
        $fridge = Fridge::factory()->create();
        $user->fridges()->attach($fridge);

        $result = FridgeService::disconnect($fridge->id);

        $this->assertTrue($result);
        $this->assertDatabaseMissing('fridge_user', [
            'user_id' => $user->id,
            'fridge_id' => $fridge->id,
        ]);
    }

    public function test_disconnect_not_connected()
    {
        $this->authenticate();
        $fridge = Fridge::factory()->create();

        $result = FridgeService::disconnect($fridge->id);

        $this->assertFalse($result);
    }

    public function test_delete_fridge_success()
    {
        $this->authenticate();
        $fridge = Fridge::factory()->create();

        $response = FridgeService::deleteFridge($fridge->id);

        $this->assertEquals('Fridge deleted successfully.', $response->original['message']);
        $this->assertDatabaseMissing('fridges', ['id' => $fridge->id]);
    }

    public function test_delete_fridge_not_found()
    {
        $this->authenticate();

        $response = FridgeService::deleteFridge(999);

        $this->assertEquals('Fridge not found.', $response->original['message']);
    }
}

<?php

namespace Tests\Unit;

use App\Models\User;
use App\Models\Fridge;
use App\Services\FridgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
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

    
}

<?php

namespace Tests\Unit;

use App\Http\Requests\ConnectFridgeRequest;
use App\Models\User;
use App\Models\Fridge;
use App\Services\FridgeService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Tests\TestCase;
use App\Http\Requests\CreateFridgeRequest;
use Illuminate\Support\Facades\Validator;
use Mockery;

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
        $user = User::factory()->create();
        $this->actingAs($user, 'api');

        $fridge = Fridge::factory()->create([
            'password' => Hash::make('secretpass'),
        ]);

        $request = Mockery::mock(ConnectFridgeRequest::class);
        $request->shouldReceive('validated')->andReturn([
            'code' => $fridge->code,
            'password' => 'secretpass',
        ]);

        $response = FridgeService::connect($request);

        $this->assertEquals($fridge->id, $response->id);
    }


    public function testUpdateFridgeSuccessfully()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $data = [
            'name' => 'New Fridge Name',
            'code' => 'AB3423',
            'password' => 'secret123'
        ];

        $request = new CreateFridgeRequest();
        $request->merge($data);

        $validator = Validator::make($data, $request->rules());
        $this->assertFalse($validator->fails());

        $result = FridgeService::addOrUpdateFridge($request, "add");

        $this->assertEquals("Fridge added successfully", $result['message']);
        $this->assertEquals($user->id, $result['fridge']->user_id);
    }

}

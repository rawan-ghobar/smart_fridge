<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testSignup(): void
    {
        $email = $this->faker->unique()->safeEmail();

        $response = $this->postJson("/api/v0.1/guest/signup", [
                                    "first_name" => "Rawan",
                                    "last_name" => "Ghobar",
                                    "email" => $email,
                                    "password" => "password123"
        ]);

        $response->assertStatus(201)
                 ->assertJson([
                     "success" => true,
                     "data" => [
                         "message" => "User registered successfully.",
                     ]
                 ])
                 ->assertJsonStructure([
                     "success",
                     "data" => [
                         "message",
                         "user" => [
                             "id",
                             "first_name",
                             "last_name",
                             "email",
                             "created_at",
                             "updated_at"
                         ]
                     ]
                 ]);
    }
}

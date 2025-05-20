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

        $response->assertStatus(200)
                 ->assertJson([
                     "success" => true,
                     "data" => [
                         "id" => true,
                         "first_name" => "Rawan",
                         "last_name" => "Ghobar",
                         "email" => $email,
                     ]
                 ])
                 ->assertJsonStructure([
                     "success",
                     "data" => [
                         "id",
                         "first_name",
                         "last_name",
                         "email",
                         "created_at",
                         "updated_at"
                     ]
                 ]);
    }

    public function testLogin(): void
{
    $user = User::factory()->create([
        "email" => "rawan@example.com",
        "password" => bcrypt("password123")
    ]);

    $response = $this->postJson("/api/v0.1/guest/login", [
        "email" => "rawan@example.com",
        "password" => "password123"
    ]);

    $response->assertStatus(200)
             ->assertJson([
                 "success" => true,
             ])
             ->assertJsonStructure([
                 "success",
                 "data" => [
                     "id",
                     "first_name",
                     "last_name",
                     "email",
                     "token"
                 ]
             ]);
}

    public function testLoginFailsWithInvalidPassword(): void
    {
        $user = User::factory()->create([
            "email" => "rawan@example.com",
            "password" => bcrypt("correct-password")
        ]);

        $response = $this->postJson("/api/v0.1/guest/login", [
            "email" => "rawan@example.com",
            "password" => "wrong-password"
        ]);

        $response->assertStatus(401)
                 ->assertJson([
                     "success" => false,
                     "message" => "Invalid credentials"
                 ]);
    }

    public function testLogout(): void
    {
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        $response = $this->withHeaders([
            "Authorization" => "Bearer $token"
        ])->postJson("/api/v0.1/user/logout");

        $response->assertStatus(200)
                ->assertJson([
                    "success" => true,
                    "data" => "User logged out successfully"
                ]);
    }
}

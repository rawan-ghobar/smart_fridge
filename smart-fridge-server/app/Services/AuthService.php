<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class AuthService
{
    use ResponseTrait;

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! $token = Auth::attempt($credentials)){
            return $this->errorResponse("Unauthorized", 401);
        }

        $user = Auth::user();
        $user->token = $token;

        return $this->successResponse([
            'message' => 'User logged in successfully',
            'user'  => $user,
            'token' => $token,
        ]);
    }
}

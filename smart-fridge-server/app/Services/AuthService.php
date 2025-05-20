<?php

namespace App\Services;
use App\Models\User;
use Illuminate\Http\Request;
use App\Traits\ResponseTrait;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
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
        $token = JWTAuth::attempt($credentials);

        return $this->successResponse([
            'message' => 'User logged in successfully',
            'user'  => $user,
            'token' => $token,
        ]);
    }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return $this->successResponse([
            'message' => 'User registered successfully.',
            'user'    => $user,
        ], 201);
    }

    public function logout(Request $request)
    {
        try {
            if (!$token = JWTAuth::getToken()){
                return $this->errorResponse('Token not provided.', 400);
            }
            JWTAuth::invalidate($token);

            return $this->successResponse(['message' => 'User logged out successfully.']);
            }

             catch (JWTException $e) {
                return $this->errorResponse('Failed to logout, please try again.', 500);
            }
    }
}

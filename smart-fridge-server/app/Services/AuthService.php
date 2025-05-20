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

    public static function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (! $token = Auth::attempt($credentials)){
            return self::errorResponse('invalid credentials',401);
        }

        $user = Auth::user();
        $token = Auth::attempt($credentials);

        return [
            'message' => 'User logged in successfully',
            'user'    => $user,
            'token'   => $token,
        ];
    }

    public static function signup(SignupRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        return $user;
    }

    public static function logout()
    {
        $token = $token = JWTAuth::getToken();
        JWTAuth::invalidate($token);
        return true;
    }
}

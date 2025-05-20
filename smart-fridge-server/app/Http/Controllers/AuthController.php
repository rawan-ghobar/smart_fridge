<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Services\AuthService;
use App\Traits\ResponseTrait;

class AuthController extends Controller
{
    use ResponseTrait;

    public static function login(LoginRequest $request)
    {
        $userData= AuthService::login($request);
        
        if (!is_array($userData)) {
            return $userData;
        }

        return ResponseTrait::successResponse($userData);
    }

    public static function signup(SignupRequest $request)
    {
        $user = AuthService::signup($request);
        return ResponseTrait::successResponse($user);
    }

    public function logout()
    {
        AuthService::logout();
        return ResponseTrait::successResponse('User logged out successfully');
    }
}

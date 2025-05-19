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
        $user = AuthService::login($request);

        if (!$user) {
            return ResponseTrait::errorResponse('Invalid credentials', 401);
        }

        return ResponseTrait::successResponse($user);
    }

    public function signup(SignupRequest $request)
    {
        return $this->authService->signup($request);
    }

    public function logout()
    {
        return $this->authService->logout(request());
    }
}

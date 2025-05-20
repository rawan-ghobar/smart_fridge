<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(LoginRequest $request)
    {
        return $this->authService->login($request);
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

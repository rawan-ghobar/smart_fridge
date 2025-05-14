<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v0.1')->group(function () {

    Route::middleware('auth:api')->group(function () {

        Route::prefix('user')->group(function () {
                Route::post('/logout', [AuthController::class, 'logout']);
        });

    });

    Route::prefix('guest')->group(function () {
        Route::post('/login',  [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
    });
});

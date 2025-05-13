<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v0.1')->group(function () {

    Route::prefix('guest')->group(function () {
        Route::post('/login',  [AuthController::class, 'login']);
    });
});

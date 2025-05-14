<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FridgeController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v0.1')->group(function () {

    Route::middleware('auth:api')->group(function () {

        Route::prefix('user')->group(function () {
                Route::post('/logout', [AuthController::class, 'logout']);
        });

        Route::prefix('fridge')->group(function () {
            Route::post('/connect', [FridgeController::class, 'connect']);
            Route::get('/getfridges', [FridgeController::class, 'getFridges']);
            Route::post('/addorupdate/{id}',   [FridgeController::class, 'addorUpdateFridge']);
            Route::delete('/disconnect/{id}',  [FridgeController::class, 'disconnect']);
        });

        Route::prefix('items')->group(function () {
            Route::get('/getitems/{fridgeId}' , [ItemController::class, 'getItems']);
        });

    });

    Route::prefix('guest')->group(function () {
        Route::post('/login',  [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
    });
});

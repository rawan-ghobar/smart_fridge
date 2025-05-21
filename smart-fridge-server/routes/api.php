<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FridgeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\MealGenerationController;
use Illuminate\Support\Facades\Route;

Route::prefix('v0.1')->group(function () {

    Route::middleware('auth:api')->group(function () {

        Route::prefix('user')->group(function () {
                Route::post('/logout', [AuthController::class, 'logout']);
        });

        Route::prefix('meal')->group(function () {
            Route::post('/generate', [MealGenerationController::class, 'generate']);
            Route::post('/generatewithcal', [MealGenerationController::class, 'generateMealWithCalorieLimit']);
        });

        Route::prefix('fridge1')->group(function () {

            Route::get('/getfridges', [FridgeController::class, 'getFridges']);

            Route::delete('/disconnect/{id}',  [FridgeController::class, 'disconnect']);
        });

        Route::prefix('items')->group(function () {
            Route::get('/getitems/{fridgeId}' , [ItemController::class, 'getItems']);
            Route::get('/getitem/{fridgeId}/{itemId}', [ItemController::class, 'getItem']);
            Route::post('/addorupdateitem/{fridgeId}/{itemId?}', [ItemController::class, 'addorUpdateItem']);
            Route::delete('/deleteitem/{fridgeId}/{itemId}', [ItemController::class, 'deleteItem']);
        });

    });

    Route::prefix('guest')->group(function () {
        Route::post('/login',  [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
    });

    Route::prefix('fridge')->group(function (){
        Route::post('/addorupdate/{id}',   [FridgeController::class, 'addorUpdateFridge']);
        Route::post('/connect', [FridgeController::class, 'connect']);
    });
});

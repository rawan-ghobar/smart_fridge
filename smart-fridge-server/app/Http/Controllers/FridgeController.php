<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConnectFridgeRequest;
use App\Http\Requests\CreateFridgeRequest;
use App\Services\FridgeService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class FridgeController extends Controller
{
    use ResponseTrait;

    public function connect(ConnectFridgeRequest $request)
    {
        $connection = FridgeService::connect($request);
        return ResponseTrait::successResponse($connection);
    }

    public static function getFridges()
    {
        $fridges = FridgeService::getFridges();
        return ResponseTrait::successResponse($fridges);
    }

    public static function addorUpdateFridge(CreateFridgeRequest $request, $id="null")
    {
         $fridge = FridgeService::addorUpdateFridge($request, $id);
         return ResponseTrait::successResponse($fridge);

    }

    public static function disconnect($id)
    {
        $disconnected = FridgeService::disconnect($id);
        if (!$disconnected) {
        return ResponseTrait::errorResponse("Fridge not found or not connected to user.", 404);
        }

        return ResponseTrait::successResponse("Fridge disconnected successfully.");
    }
}

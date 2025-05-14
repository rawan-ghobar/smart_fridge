<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFridgeRequest;
use App\Services\FridgeService;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class FridgeController extends Controller
{
    use ResponseTrait;

    public function connect(Request $request)
    {
        $connection = FridgeService::connect($request);
        return ResponseTrait::successResponse($connection);
    }
}

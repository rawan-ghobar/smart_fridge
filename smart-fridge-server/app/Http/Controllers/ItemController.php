<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ItemService;
use App\Traits\ResponseTrait;

class ItemController extends Controller
{
    use ResponseTrait;

    public static function getItem($fridgeId, $itemId)
    {
        $item = ItemService::getItem($fridgeId, $itemId);

        if (!$item) {
            return ResponseTrait::errorResponse("Item not found.", 404);
        }

        return ResponseTrait::successResponse($item);
    }

    public static function addorUpdateItem(Request $request, $fridgeId, $itemId = "add")
    {
        $result = ItemService::addOrUpdateItem($request, $fridgeId, $itemId);

        if (!$result) {
            return ResponseTrait::errorResponse("Fridge or item not found.", 404);
        }
    }

}

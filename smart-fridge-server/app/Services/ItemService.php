<?php

namespace App\Services;
use App\Models\Fridge;
use App\Models\FridgeItem;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;

class ItemService
{
    use ResponseTrait;

    public static function getItem(int $fridgeId, int $itemId)
    {
        $fridge = Fridge::find($fridgeId);

        if (!$fridge) {
            return null;
        }

        return $fridge->items()->find($itemId);
    }
}

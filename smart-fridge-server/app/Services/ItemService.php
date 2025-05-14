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

    public static function addOrUpdateItem(Request $request, $fridgeId, $itemId = "add")
    {
        $fridge = Fridge::find($fridgeId);

        $fridgeId = (int) $fridgeId;

        if ($itemId === "add"){
            $item = new FridgeItem;
            $message = "Item added successfully";
        }

        else {
            $item = FridgeItem::find($itemId);
            if (!$item){
                return ResponseTrait::errorResponse("Fridge not found!",404);
            }
            $message = "Item updated successfully";
        }

        $item->name = $request['name'];
        $item->quantity = $request["quantity"];
        $item->calories = $request["calories"];
        $item->unit = $request["unit"];
        $item->fridge_id = $fridgeId;
        $item->save();

        return ['message' => $message,'item' => $item];
    }

    public static function deleteItem(int $fridgeId, int $itemId)
    {
        $fridge = Fridge::find($fridgeId);
        if (!$fridge) {
            return false;
        }

        $item = $fridge->items()->find($itemId);
        if (!$item) {
            return false;
        }

        return $item->delete();
    }
}

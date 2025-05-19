<?php

namespace App\Helpers;

class ItemHelper
{
    public static function mapFridgeItems($fridgeItems): array
    {
        return $fridgeItems->map(function ($item) {
            return [
                'name' => $item->name,
                'quantity' => $item->quantity,
                'unit' => $item->unit,
                'calories_per_unit' => $item->calories,
            ];
        })->toArray();
    }

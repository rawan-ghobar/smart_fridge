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

    public static function buildItemsDescription(array $items): string
    {
        $lines = [];

        foreach ($items as $item) {
            $lines[] = sprintf(
                '- %s : %s %s available, %s kcal per %s',
                $item['name'],
                $item['quantity'],
                $item['unit'],
                $item['calories_per_unit'],
                $item['unit']
            );
        }

        return implode("\n", $lines);
    }

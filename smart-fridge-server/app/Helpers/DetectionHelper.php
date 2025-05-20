<?php
namespace App\Helpers;

class DetectionHelper
{
    public static function groupPredictions(array $predictions): array
    {
        return collect($predictions)
            ->groupBy('class')
            ->map(function ($group, $class) {
                return [
                    'name'     => $class,
                    'quantity' => count($group),
                ];
            })
            ->values()
            ->toArray();
    }
}

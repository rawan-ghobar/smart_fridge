<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use App\Traits\ResponseTrait;

class FoodDetectionService
{
    use ResponseTrait;

    public static function detectFood(string $imagePath)
    {
        $apiUrl = config('services.roboflow.api_url');
        $apiKey = config('services.roboflow.api_key');

        $response = Http::attach('file', file_get_contents($imagePath), 'food.jpg')->post("$apiUrl?api_key=$apiKey");

        if (!$response) {
            return false;
        }

        return $response;
    }
}

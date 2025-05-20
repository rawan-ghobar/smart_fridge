<?php

namespace App\Services;

use App\Http\Requests\ImageRequest;
use App\Schemas\ItemRecognitionSchema;
use App\Services\FoodDetectionService;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Helpers\ImageHelper;
use App\Helpers\DetectionHelper;
use App\Helpers\PromptHelper;

class ItemRecognitionService
{
    public static function recognizeItems(ImageRequest $imageRequest)
    {
        $imagePath = ImageHelper::storeImage($imageRequest->file('image'));

        $detectionResponse = FoodDetectionService::detectFood($imagePath);

        if (!is_array($detectionResponse) || empty($detectionResponse['predictions'])) {
            return [[
                'name' => 'unknown',
                'quantity' => 0,
                'unit' => 'unknown',
                'calories' => 0
            ]];
        }

        return self::getDetails($detectionResponse['predictions']);
    }

    public static function getDetails(array $predictions)
    {
        $detectedItems = DetectionHelper::groupPredictions($predictions);

        $schema = ItemRecognitionSchema::createPrismSchema(
            'item_recognition',
            'Detect and describe each food item from object detection result, including quantity, unit, and calories.',
            [
                'name'     => 'Name of the detected food item (singular)',
                'quantity' => 'Number of visible units of this item',
                'unit'     => 'Measurement unit (pcs, slice, cup, etc.)',
                'calories' => 'Approximate calories per single unit of this item',
            ]
        );

        $prompt = PromptHelper::buildItemRecognitionPrompt($detectedItems);

        $response = Prism::structured()
            ->using(Provider::OpenAI, 'gpt-4o')
            ->withSchema($schema)
            ->withClientOptions(['temperature' => 0.4])
            ->withSystemPrompt('You are a smart fridge AI specialized in food item recognition, counting, and calorie estimation.')
            ->withPrompt($prompt)
            ->asStructured();

        return $response->structured;
    }
}

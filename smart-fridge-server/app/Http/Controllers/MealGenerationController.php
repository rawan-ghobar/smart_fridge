<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Services\ItemService;
use App\Traits\ResponseTrait;
use App\Services\MealGenerationService;
use App\Services\MealGenerationWithCaloriesService;

class MealGenerationController extends Controller
{
    use ResponseTrait;

        public function generate(Request $request)
        {
            $mealType = $request->input('mealType');
            $fridgeId = $request->input('fridgeId');

            $items = ItemService::getItems($fridgeId);
            $result = MealGenerationService::generateMeal($mealType, $items);

            return ResponseTrait::successResponse($result);
        }

        public function generateMealWithCalorieLimit(Request $request)
        {
            $mealType = $request->input('mealType');
            $fridgeId = $request->input('fridgeId');
            $usercalories = $request->input('usercalories');
            $userNotes = $request->input('userNotes');


            $items = ItemService::getItems($fridgeId);
            $result = MealGenerationWithCaloriesService::generateMealWithCalorieLimit($items,$mealType, $usercalories, $userNotes );

            return ResponseTrait::successResponse($result);
        }

}

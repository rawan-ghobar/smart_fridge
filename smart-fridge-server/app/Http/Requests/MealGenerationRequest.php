<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MealGenerationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'mealType'  => 'required|string|in:Breakfast,Lunch,Dinner',
            'fridgeId'  => 'required|exists:fridges,id',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFridgeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'code' => 'required|string|unique:fridges,code',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages():array{
        return [
            'code.unique' => 'This fridge code already exists.',
            'password.min' => 'The fridge password must be at least 6 characters.',
        ];
    }
}

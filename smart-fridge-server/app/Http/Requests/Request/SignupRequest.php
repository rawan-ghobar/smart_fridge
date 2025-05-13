<?php

namespace App\Http\Requests;

use App\Http\Requests\BaseFormRequest;

class SignupRequest extends BaseFormRequest
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
            "first_name" => "required|string|max:255",
            "last_name" => "required|string|max:255",
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
        ];
    }

    public function messages(): array
    {
        return [
           "email.required" => "Your email is required!",
            "password.required" => "Your password is required!",
            "first_name.required" => "Your first name is required!",
            "last_name.required" => "Your last name is required!",
            "password.min" => "Your password must be at least 8 characters long.",
        ];
    }
}

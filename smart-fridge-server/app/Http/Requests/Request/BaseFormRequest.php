<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Traits\ResponseTrait;

class BaseFormRequest extends FormRequest
{
    use ResponseTrait;

    protected function failedValidation(Validator $validator)
    {
        $this->handleFailedValidation($validator);
    }
}

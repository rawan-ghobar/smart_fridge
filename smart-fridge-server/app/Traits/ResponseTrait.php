<?php

namespace App\Traits;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

trait ResponseTrait{
    public static function successResponse($data, $code=200){
        return response()->json([
            "success" => true,
            "data" => $data
        ], $code);
    }

    public static function errorResponse($message, $code){
        return response()->json([
            "success" => false,
            "message" => $message
        ], $code);
    }

    public function handleFailedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            "success" => false,
            "result" => $validator->errors()
        ], 422));
    }
}

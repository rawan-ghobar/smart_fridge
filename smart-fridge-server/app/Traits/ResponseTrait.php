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
}

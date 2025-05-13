<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MealIngredient extends Model
{
    use HasFactory;

    protected $fillable = [
        'meal_id',
        'name',
        'quantity',
        'unit',
        'calories'
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meal extends Model
{
    use HasFactory;

    protected $fillable = [
        'fridge_id',
        'title',
        'description',
        'calories'
    ];

    public function fridge()
    {
        return $this->belongsTo(Fridge::class);
    }

    public function ingredients()
    {
        return $this->hasMany(MealIngredient::class);
    }
}

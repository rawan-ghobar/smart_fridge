<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fridge extends Model
{
    Use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'password'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function items()
    {
        return $this->hasMany(FridgeItem::class);
    }

    public function meals()
    {
        return $this->hasMany(Meal::class);
    }

    public function shoppingLists()
    {
        return $this->hasMany(ShoppingList::class);
    }
}

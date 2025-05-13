<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShoppingList extends Model
{
    use HasFactory;

    protected $fillable = [
        'fridge_id',
        'title'
    ];

    public function fridge()
    {
        return $this->belongsTo(Fridge::class);
    }

    public function items()
    {
        return $this->hasMany(ShoppingListItem::class);
    }
}

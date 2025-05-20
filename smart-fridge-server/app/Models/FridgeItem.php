<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class FridgeItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'fridge_id',
        'name',
        'quantity',
        'unit',
        'calories',
        'added_at',
        'expiry_date',
        'image'
    ];

    public function fridge()
    {
        return $this->belongsTo(Fridge::class);
    }

    public function scopeExpiringWithin($query, $user)
    {
        $days = $user->settings->days_before_expiry ?? 3;
        $today = now();
        $limit = now()->addDays($days);

        return $query->whereDate('expiry_date', '>=', $today) ->whereDate('expiry_date', '<=', $limit);
    }

}

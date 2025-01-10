<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bus extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'operator',
        'type',
        'departure_time',
        'arrival_time',
        'from',
        'to',
        'price',
        'available_seats',
        'total_seats',
        'amenities',
    ];

    protected $casts = [
        'amenities' => 'array', // Automatically cast JSON to array
    ];

    // Bus has many seats
    public function seats()
    {
        return $this->hasMany(Seat::class);
    }

    // Bus belongs to a route
    public function route()
    {
        return $this->belongsTo(Route::class);
    }
}

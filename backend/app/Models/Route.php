<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        'from', // Starting location
        'to',   // Destination
        'departure_time', // Time of departure
        'arrival_time',   // Time of arrival
    ];

    // A route has many buses
    public function buses()
    {
        return $this->hasMany(Bus::class);
    }
}

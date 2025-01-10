<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $fillable = ['bus_id', 'number', 'is_available', 'user_id'];

    // A seat belongs to a bus
    public function bus()
    {
        return $this->belongsTo(Bus::class);
    }

    // A seat belongs to a user (if booked)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

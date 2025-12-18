<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bus_id',
        'seat_numbers', // Comma-separated seat numbers
        'total_price', // Total price of the booking
        'status', // For example, 'confirmed', 'cancelled', 'completed'
        'travel_date', // Date of the journey
    ];

    /**
     * A booking belongs to a user.
     */
    public function user()
    {
        return $this->belongsTo(User::class); // User who made the booking
    }

    /**
     * A booking belongs to a bus.
     */
    public function bus()
    {
        return $this->belongsTo(Bus::class); // The bus assigned for the booking
    }

    /**
     * A booking belongs to a route.
     */
    public function route()
    {
        return $this->belongsTo(Route::class); // The route assigned to this booking
    }

    /**
     * A booking belongs to a seat.
     */
    public function seat()
    {
        return $this->belongsTo(Seat::class); // The seat that was booked
    }

    /**
     * A booking can have one review.
     */
    public function review()
    {
        return $this->hasOne(Review::class);
    }

    /**
     * Get the status of the booking.
     */
    public function getStatusAttribute($value)
    {
        // Return lowercase status to match frontend expectations
        $statuses = [
            'booked' => 'booked',
            'confirmed' => 'confirmed',
            'active' => 'active',
            'cancelled' => 'cancelled',
            'completed' => 'completed',
        ];

        return $statuses[$value] ?? 'unknown';
    }

    /**
     * Get the travel date in a more readable format.
     */
    public function getFormattedTravelDateAttribute()
    {
        return \Carbon\Carbon::parse($this->travel_date)->format('d-m-Y');
    }

    /**
     * Calculate the total price of the booking based on seat and route.
     * This is just an example; adjust according to your business logic.
     */
    public function calculateTotalPrice()
    {
        $seatPrice = $this->seat->price ?? 0; // Assuming seat model has price field
        $routePrice = $this->route->price ?? 0; // Assuming route model has price field

        return $seatPrice + $routePrice;
    }
}

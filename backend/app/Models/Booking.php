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
        'route_id',
        'seat_id', // Assuming the booking is related to a single seat
        'status', // For example, 'active', 'cancelled', 'completed'
        'travel_date', // Date of the journey
        'price', // Total price of the booking
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
     * Get the status of the booking.
     */
    public function getStatusAttribute($value)
    {
        // You can map statuses to meaningful text
        $statuses = [
            'active' => 'Active',
            'cancelled' => 'Cancelled',
            'completed' => 'Completed',
        ];

        return $statuses[$value] ?? 'Unknown';
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

<?php

namespace App\Observers;

use App\Models\Bus;
use App\Models\Seat;

class BusObserver
{
    /**
     * Handle the Bus "created" event.
     * Automatically create seats when a new bus is created.
     */
    public function created(Bus $bus): void
    {
        // Create seats for the newly created bus
        for ($i = 1; $i <= $bus->total_seats; $i++) {
            Seat::create([
                'bus_id' => $bus->id,
                'number' => $i,
                'is_available' => true,
            ]);
        }
    }

    /**
     * Handle the Bus "updated" event.
     * Update seats if total_seats changes.
     */
    public function updated(Bus $bus): void
    {
        // If total_seats changed, add/remove seats as needed
        $existingSeatsCount = $bus->seats()->count();
        $newTotalSeats = $bus->total_seats;

        if ($newTotalSeats > $existingSeatsCount) {
            // Add more seats if total_seats increased
            $seatsToAdd = $newTotalSeats - $existingSeatsCount;
            $nextSeatNumber = $existingSeatsCount + 1;

            for ($i = 0; $i < $seatsToAdd; $i++) {
                Seat::create([
                    'bus_id' => $bus->id,
                    'number' => $nextSeatNumber + $i,
                    'is_available' => true,
                ]);
            }
        } elseif ($newTotalSeats < $existingSeatsCount) {
            // Remove seats if total_seats decreased
            $seatsToRemove = $existingSeatsCount - $newTotalSeats;
            $bus->seats()
                ->orderByDesc('number')
                ->limit($seatsToRemove)
                ->delete();
        }
    }

    /**
     * Handle the Bus "deleting" event.
     * Ensure seats are removed when a bus is deleted.
     */
    public function deleting(Bus $bus): void
    {
        $bus->seats()->delete();
    }
}

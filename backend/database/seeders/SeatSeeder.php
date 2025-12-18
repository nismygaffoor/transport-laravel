<?php
// database/seeders/SeatSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Seat;
use App\Models\Bus;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all buses from the database
        $buses = Bus::all();

        // Generate seats for each bus based on their total_seats
        foreach ($buses as $bus) {
            for ($i = 1; $i <= $bus->total_seats; $i++) {
                Seat::create([
                    'bus_id' => $bus->id,
                    'number' => $i,
                    'is_available' => true, // All seats available by default
                ]);
            }
        }
    }
}

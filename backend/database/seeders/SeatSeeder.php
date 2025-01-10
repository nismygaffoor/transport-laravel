<?php
// database/seeders/SeatSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Seat;

class SeatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Example bus ID for which to create seats
        $busId = 1;

        // Generate seats for the bus
        for ($i = 1; $i <= 45; $i++) {
            Seat::create([
                'bus_id' => $busId,
                'number' => $i,
                'is_available' => rand(0, 1), // Randomly assign availability
            ]);
        }
    }
}

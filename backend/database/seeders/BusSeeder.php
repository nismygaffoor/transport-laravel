<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bus;

class BusSeeder extends Seeder
{
    public function run()
    {
        Bus::create([
            'name' => 'Express Line',
            'operator' => 'Lanka Bus Lines',
            'type' => 'Private',
            'departure_time' => '08:00',
            'arrival_time' => '14:00',
            'from' => 'Colombo',
            'to' => 'Kandy',
            'price' => 1200,
            'available_seats' => 25,
            'total_seats' => 45,
            'amenities' => json_encode(['wifi', 'ac', 'refreshments']),
        ]);

        Bus::create([
            'name' => 'City Express',
            'operator' => 'Southern Transport',
            'type' => 'Public',
            'departure_time' => '09:30',
            'arrival_time' => '15:30',
            'from' => 'Colombo',
            'to' => 'Galle',
            'price' => 800,
            'available_seats' => 15,
            'total_seats' => 40,
            'amenities' => json_encode(['ac']),
        ]);

        Bus::create([
            'name' => 'GafoorExpress',
            'operator' => 'Southern Transport',
            'type' => 'Public',
            'departure_time' => '09:30',
            'arrival_time' => '15:30',
            'from' => 'Akkaraiapttu',
            'to' => 'Aranayake',
            'price' => 800,
            'available_seats' => 15,
            'total_seats' => 40,
            'amenities' => json_encode(['ac']),
        ]);
    }
}


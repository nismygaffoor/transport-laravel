<?php

namespace App\Http\Controllers;

use App\Models\Bus;
use App\Models\Booking;
use App\Models\Route;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Method to fetch stats
    public function getStats()
{
    try {
        // Get the total number of buses
        $totalBuses = Bus::count();

        // Get the total number of active bookings (assuming status = 'active' represents active bookings)
        $activeBookings = Booking::where('status', 'active')->count();

        // Get the total number of routes
        $totalRoutes = Route::count();

        // Return the data as JSON
        return response()->json([
            'totalBuses' => $totalBuses,
            'activeBookings' => $activeBookings,
            'totalRoutes' => $totalRoutes,
        ]);
    } catch (\Exception $e) {
        \Log::error('Error fetching stats: ' . $e->getMessage());  // Log the error
        return response()->json(['error' => 'Failed to fetch stats', 'message' => $e->getMessage()], 500);
    }

    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Bus;
use App\Models\Route;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Return aggregated metrics for the admin dashboard.
     */
    public function getStats()
    {
        try {
            $totalBuses = Bus::count();

            // Treat confirmed bookings as active/valid
            $totalBookings = Booking::count();
            $activeBookings = Booking::where('status', 'confirmed')->count();

            $today = Carbon::today();
            $todayBookings = Booking::whereDate('travel_date', $today)->count();

            // Revenue from total_price column (nullable safe)
            $totalRevenue = (float) Booking::sum('total_price');

            // Seat utilization across fleet
            $totalSeats = (int) Bus::sum('total_seats');
            $availableSeats = (int) Bus::sum('available_seats');
            $soldSeats = max(0, $totalSeats - $availableSeats);
            $seatUtilization = $totalSeats > 0 ? round(($soldSeats / $totalSeats) * 100, 1) : 0;

            $totalRoutes = Route::count();
            $totalUsers = User::count();

            return response()->json([
                'totalBuses' => $totalBuses,
                'totalBookings' => $totalBookings,
                'activeBookings' => $activeBookings,
                'todayBookings' => $todayBookings,
                'totalRevenue' => $totalRevenue,
                'soldSeats' => $soldSeats,
                'seatUtilization' => $seatUtilization,
                'totalRoutes' => $totalRoutes,
                'totalUsers' => $totalUsers,
            ]);
        } catch (\Exception $e) {
            \Log::error('Error fetching stats: ' . $e->getMessage());
            return response()->json([
                'error' => 'Failed to fetch stats',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}

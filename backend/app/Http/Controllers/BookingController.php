<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    /**
     * Create a new booking
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'bus_id' => 'required|exists:buses,id',
            'seat_numbers' => 'required|string',
            'total_price' => 'required|numeric',
            'travel_date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $booking = Booking::create([
            'user_id' => $request->user_id,
            'bus_id' => $request->bus_id,
            'seat_numbers' => $request->seat_numbers,
            'total_price' => $request->total_price,
            'travel_date' => $request->travel_date,
            'status' => 'booked',
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'Booking created successfully',
            'booking' => $booking
        ], 201);
    }

    /**
     * Get all bookings
     */
    public function getBookings()
    {
        $bookings = Booking::with('bus', 'user')->get();
        return response()->json($bookings);
    }

    /**
     * Get user bookings
     */
    public function getUserBookings($userId)
    {
        $bookings = Booking::with(['bus', 'review'])
            ->where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();
        
        return response()->json($bookings);
    }

    /**
     * Update booking status (admin action)
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:booked,confirmed,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $booking->status = $request->status;
        $booking->save();

        return response()->json([
            'status' => 200,
            'message' => 'Status updated',
            'booking' => $booking,
        ]);
    }
}

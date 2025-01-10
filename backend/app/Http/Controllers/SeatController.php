<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\{Seat, Bus};
use Illuminate\Support\Facades\Log;

class SeatController extends Controller
{
    public function getSeats(Request $request)
    {
        $busId = $request->query('busId');
        if (!$busId) {
            return response()->json(['message' => 'Bus ID is required'], 400);
        }

        $busExists = Bus::where('id', $busId)->exists();
        if (!$busExists) {
            return response()->json(['message' => 'Bus not found in database'], 404);
        }

        $seats = Seat::where('bus_id', $busId)->get();
        if ($seats->isEmpty()) {
            return response()->json(['message' => 'No seats found for this bus'], 404);
        }

        return response()->json($seats);
    }

    public function selectSeats(Request $request)
{
    DB::beginTransaction();
    try {
        $validated = $request->validate([
            'seat_ids' => 'required|array',
            'seat_ids.*' => 'integer|exists:seats,id',
        ]);

        $updated = Seat::whereIn('id', $validated['seat_ids'])
                       ->where('is_available', true)
                       ->lockForUpdate()
                       ->update(['is_available' => false
                    ]);

        if ($updated === 0) {
            DB::rollBack();
            return response()->json(['message' => 'No seats updated. Seats might already be booked.'], 400);
        }

        DB::commit();
        return response()->json(['message' => 'Seats selected successfully'], 200);
    } catch (\Exception $e) {
        DB::rollBack();
        Log::error('Error selecting seats:', ['error' => $e->getMessage()]);
        return response()->json(['message' => 'Failed to select seats.'], 500);
    }
}


//     public function testRelationships()
//     {
//         $bus = Bus::find(1);
//         $seats = $bus ? $bus->seats : null;

//         $seat = Seat::find(1);
//         $busFromSeat = $seat ? $seat->bus : null;

//         return response()->json([
//             'bus' => $bus,
//             'seats' => $seats,
//             'seat' => $seat,
//             'busFromSeat' => $busFromSeat,
//         ]);
//     }
}

<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bus;

class BusController extends Controller
{
    public function search(Request $request)
    {
        $query = Bus::query();

        if ($request->has('from')) {
            $query->where('from', $request->input('from'));
        }

        if ($request->has('to')) {
            $query->where('to', $request->input('to'));
        }

        if ($request->has('type')) {
            $query->where('type', $request->input('type'));
        }

        $buses = $query->get();

        return response()->json($buses);
    }

   

    
    
   
        public function show($id)
        {
            $bus = Bus::find($id);
            if (!$bus) {
                return response()->json(['message' => 'Bus not found'], 404);
            }
            return response()->json($bus);
        }
    
    
    /**
     * Get all buses.
     */
    public function index()
    {
        $buses = Bus::all();
        return response()->json($buses, 200);
    }

    /**
     * Add a new bus.
     */public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'name' => 'required|string',
            'operator' => 'required|string',
            'type' => 'string',
            'from' => 'required|string',
            'to' => 'required|string',
            'departureTime' => 'required|string',
            'arrivalTime' => 'required|string',
            'price' => 'required|numeric',
            'availableSeats' => 'integer',
            'totalSeats' => 'required|integer',
        ]);

        $bus = Bus::create($validated);
        return response()->json($bus, 201);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to add route'], 500);
    }
}

    /**
     * Update a bus.
     */
    public function update(Request $request, $id)
    {
        $bus = Bus::find($id);
        if (!$bus) {
            return response()->json(['message' => 'Bus not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'operator' => 'sometimes|required|string|max:255',
            'type' => 'sometimes|required|string|max:50',
            'departureTime' => 'sometimes|required',
            'arrivalTime' => 'sometimes|required',
            'from' => 'sometimes|required|string|max:255',
            'to' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric',
            'totalSeats' => 'sometimes|required|integer',
            'amenities' => 'nullable|array',
        ]);

        $bus->update($validated);

        return response()->json(['message' => 'Bus updated successfully', 'bus' => $bus], 200);
    }

    /**
     * Delete a bus.
     */
    public function destroy($id)
    {
        $bus = Bus::find($id);
        if (!$bus) {
            return response()->json(['message' => 'Bus not found'], 404);
        }

        $bus->delete();
        return response()->json(['message' => 'Bus deleted successfully'], 200);
    }
}

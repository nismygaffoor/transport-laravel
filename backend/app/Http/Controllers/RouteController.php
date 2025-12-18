<?php
namespace App\Http\Controllers;

use App\Models\Route;
use Illuminate\Http\Request;

class RouteController extends Controller
{
    public function index()
    {
        return Route::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'from' => 'required|string|max:255',
            'to' => 'required|string|max:255',
            'departure_time' => 'required',
            'arrival_time' => 'required',
        ]);

        $route = Route::create($validated);
        return response()->json($route, 201);
    }

    public function update(Request $request, $id)
    {
        $route = Route::findOrFail($id);
        $validated = $request->validate([
            'from' => 'sometimes|required|string|max:255',
            'to' => 'sometimes|required|string|max:255',
            'departure_time' => 'sometimes|required',
            'arrival_time' => 'sometimes|required',
        ]);

        $route->update($validated);
        return response()->json($route, 200);
    }

    public function destroy($id)
    {
        Route::destroy($id);
        return response()->json(null, 204);
    }
}

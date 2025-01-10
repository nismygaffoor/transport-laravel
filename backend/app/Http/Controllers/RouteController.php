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
        $route = Route::create($request->all());
        return response()->json($route, 201);
    }

    public function update(Request $request, $id)
    {
        $route = Route::findOrFail($id);
        $route->update($request->all());
        return response()->json($route, 200);
    }

    public function destroy($id)
    {
        Route::destroy($id);
        return response()->json(null, 204);
    }
}

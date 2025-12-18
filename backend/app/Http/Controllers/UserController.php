<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get all users
     */
    public function index()
    {
        $users = User::withCount('bookings')->orderBy('created_at', 'desc')->get();
        return response()->json($users);
    }

    /**
     * Get a specific user
     */
    public function show($id)
    {
        $user = User::with('bookings')->findOrFail($id);
        return response()->json($user);
    }
}

<?php

use App\Http\Controllers\Admin\AuthController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\BusController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;

// Authentication routes
Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::post('/login', [UserAuthController::class, 'authenticate']);
Route::post('/signup', [SignupController::class, 'store'])->name('signup');

// Bus routes
Route::get('/buses', [BusController::class, 'search']); // Search buses
Route::get('/buses/{id}', [BusController::class, 'show']); // Get a single bus by ID

// Seat routes
Route::get('/seats', [SeatController::class, 'getSeats']); // Get available seats
Route::post('/seats/select', [SeatController::class, 'selectSeats']); // Select seats








Route::get('/admin/stats', [AdminController::class, 'getStats']);

// For getting all bus routes
Route::get('admin/buses', [BusController::class, 'index']);

// For adding a new bus route
Route::post('admin/buses', [BusController::class, 'store']);

// For editing a bus route
Route::put('admin/buses/{id}', [BusController::class, 'update']);

// For deleting a bus route
Route::delete('admin/buses/{id}', [BusController::class, 'destroy']);

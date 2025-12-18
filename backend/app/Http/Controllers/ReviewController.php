<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewController extends Controller
{
    /**
     * Store a new review.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id',
            'bus_id' => 'required|exists:buses,id',
            'booking_id' => 'nullable|exists:bookings,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $review = Review::create([
            'user_id' => $request->user_id,
            'bus_id' => $request->bus_id,
            'booking_id' => $request->booking_id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'status' => 201,
            'message' => 'Review submitted',
            'review' => $review,
        ], 201);
    }

    /**
     * Get all reviews or top reviews for home page.
     */
    public function index()
    {
        $reviews = Review::with(['user:id,name', 'bus:id,from,to'])
            ->where('rating', '>=', 4)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        return response()->json($reviews);
    }
}

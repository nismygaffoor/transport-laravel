<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function authenticate(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User ::find(Auth::user()->id);

            // Check if the user has the appropriate role
            if ($user->role === 'customer') {
                $token = $user->createToken('userToken')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id' => $user->id,
                    'name' => $user->name,
                ], 200);
            } else {
                return response()->json([
                    'status' => 405,
                    'message' => 'Unauthorized access',
                ], 405);
            }
        } else {
            return response()->json([
                'status' => 407,
                'message' => 'Invalid email or password',
            ], 407);
        }
    }
}

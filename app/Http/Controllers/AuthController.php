<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string'
            ]);

            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);

            $user->save();

            $token = $user->createToken('myAppToken')->plainTextToken;


            return response()->json([
                "success" => true,
                'message' => 'User created successfully',
                'result' => ['user' => $user, 'token' => $token]
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string'
            ]);

            $user = User::where('email', $request->email)->first();

            if (!$user || !password_verify($request->password, $user->password)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }

            $user->tokens()->delete();

            $token = $user->createToken('myAppToken')->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'result' => ['user' => $user, 'token' => $token]
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }


    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();


            return response()->json([
                'message' => 'Logout successful'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }
}

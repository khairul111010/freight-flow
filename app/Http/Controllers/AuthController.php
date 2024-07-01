<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegistrationRequest;
use Exception;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{

    public function register(RegistrationRequest $request)
    {
        try {
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

    public function login(LoginRequest $request)
    {
        try {
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


    public function refresh()
    {
        try {

            $user = User::where('email', auth()->user()->email)->first();

            if (!$user) {
                return response()->json([
                    'message' => 'Invalid user'
                ], 401);
            }

            $user->tokens()->delete();

            $token = $user->createToken('myAppToken')->plainTextToken;

            return response()->json([
                'message' => 'Refresh successful',
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

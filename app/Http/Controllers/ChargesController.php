<?php

namespace App\Http\Controllers;

use App\Models\Charge;
use Exception;
use Illuminate\Http\Request;

class ChargesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Charge retrieved successfully',
            'result' => Charge::all()
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $charge = new Charge();
            $charge->name = $request->name;
            $charge->save();

            return response()->json([
                'success' => true,
                'message' => 'Charge created successfully',
                'result' => $charge
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Charge $charge)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Charge $charge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Charge $charge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Charge $charge)
    {
        //
    }
}

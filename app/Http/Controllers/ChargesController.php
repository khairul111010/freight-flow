<?php

namespace App\Http\Controllers;

use App\Models\Charges;
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
            'message' => 'Charges retrieved successfully',
            'result' => Charges::all()
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
            $charges = new Charges();
            $charges->name = $request->name;
            $charges->save();

            return response()->json([
                'success' => true,
                'message' => 'Charges created successfully',
                'result' => $charges
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
    public function show(Charges $charges)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Charges $charges)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Charges $charges)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Charges $charges)
    {
        //
    }
}

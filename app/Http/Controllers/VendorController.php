<?php

namespace App\Http\Controllers;

use App\Http\Resources\VendorResource;
use App\Models\vendor;
use Exception;
use Illuminate\Http\Request;

class VendorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Vendors retrieved successfully',
            'result' => VendorResource::collection(Vendor::paginate($request->limit ?? 10))
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
            $vendor = new Vendor();
            $vendor->name = $request->name;
            $vendor->email = $request->email;
            $vendor->phone = $request->phone;
            $vendor->address = $request->address;
            $vendor->currency = $request->currency;
            $vendor->save();

            return response()->json([
                'success' => true,
                'message' => 'Vendor created successfully',
                'result' => VendorResource::make($vendor)
            ], 201);
        } catch (Exception $e) {
            dd($e);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Vendor retrieved successfully',
            'result' => VendorResource::make(Vendor::findOrFail($id))
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(vendor $vendor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, vendor $vendor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vendor $vendor)
    {
        //
    }
}

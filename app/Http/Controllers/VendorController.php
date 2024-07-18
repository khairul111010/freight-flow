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

        try {
            return response()->json([
                'success' => true,
                'message' => 'Vendors retrieved successfully',
                'result' => Vendor::paginate(10)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
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

        try {
            return response()->json([
                'success' => true,
                'message' => 'Vendor retrieved successfully',
                'result' => Vendor::find($id)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
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
    public function update(Request $request)
    {
        try {
            $vendor = Vendor::find($request->id);
            $vendor->name = $request->name;
            $vendor->email = $request->email;
            $vendor->phone = $request->phone;
            $vendor->address = $request->address;
            $vendor->currency = $request->currency;
            $vendor->save();
            return response()->json([
                'success' => true,
                'message' => 'Vendor updated successfully',
                'result' => $vendor
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(vendor $vendor)
    {
        //
    }
}

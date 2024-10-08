<?php

namespace App\Http\Controllers;

use App\Http\Resources\VendorResource;
use App\Models\Bill;
use App\Models\Vendor;
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
            $query = Vendor::query();
            if ($request->has('search')) {
                $search = $request->search;
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%')
                    ->orWhere('currency', 'like', '%' . $search . '%');
            }
            return response()->json([
                'success' => true,
                'message' => 'Vendors retrieved successfully',
                'result' => $query->paginate(10)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }
    public function all(Request $request)
    {

        try {
            $query = Vendor::all();

            return response()->json([
                'success' => true,
                'message' => 'Vendors retrieved successfully',
                'result' => $query
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



    public function transactions(Request $request)
    {
        try {
            $query = Bill::with(['transactions', 'vendor'])
                ->where('vendor_id', $request->id)
                ->whereHas('transactions', function ($query) use ($request) {
                    $query->whereMonth('transaction_date', $request->month)
                        ->whereYear('transaction_date', $request->year);
                })
                ->get();
            return response()->json([
                'success' => true,
                'message' => 'Vendor Transactions retrieved successfully',
                'result' => $query
            ], 200);
        } catch (Exception $e) {

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong',
            ], 500);
        }
    }
}

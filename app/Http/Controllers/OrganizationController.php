<?php

namespace App\Http\Controllers;

use App\Models\Organization;
use Exception;
use Illuminate\Http\Request;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    // public function store(Request $request)
    // {
    //     try {
    //         $organization = new Organization();
    //         $organization->name = $request->name;
    //         $organization->description = $request->description;
    //         $organization->address = $request->address;
    //         $organization->logoUrl = $request->logoUrl;
    //         $organization->currency = $request->currency;
    //         $organization->save();

    //         return response()->json([
    //             'success' => true,
    //             'message' => 'Organization created successfully',
    //             'result' => $organization
    //         ], 201);
    //     } catch (Exception $e) {
    //         return response()->json([
    //             'success' => false,
    //             'message' => 'Something went wrong!',
    //         ], 500);
    //     }
    // }

    /**
     * Display the specified resource.
     */
    public function show(Organization $organization)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $organization = Organization::find($request->id);
            $organization->name = $request->name;
            $organization->description = $request->description;
            $organization->address = $request->address;
            $organization->logoUrl = $request->logoUrl;
            $organization->currency = $request->currency;
            $organization->save();

            return response()->json([
                'success' => true,
                'message' => 'Organization updated successfully',
                'result' => $organization
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
    public function destroy(Organization $organization)
    {
        //
    }
}

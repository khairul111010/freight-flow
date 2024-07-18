<?php

namespace App\Http\Controllers;

use App\Http\Requests\Organization\OrganizationRequest;
use App\Models\Organization;
use Exception;
use Illuminate\Http\Request;
use File;

class OrganizationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Organizations retrieved successfully',
                'result' => Organization::first()
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(OrganizationRequest $request)
    {
        try {
            $organization = Organization::find($request->id);

            if ($request->hasFile('logo')) {
                $logo = $request->file('logo');
                $logoName = time() . '.' . $logo->getClientOriginalExtension();
                $path = 'uploads/logo/';
                $logo->move($path, $logoName);
                File::delete($organization->logo);
                $organization->logo = $path . $logoName;
            }
            $organization->name = $request->name;
            $organization->description = $request->description;
            $organization->address = $request->address;
            $organization->currency = $request->currency;
            $organization->invoice_prefix = $request->invoice_prefix;

            if ($organization->invoice_start_number && $request->invoice_start_number) {
                $organization->save();
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice start number already exists',
                ], 400);
            }

            $organization->invoice_start_number = $request->invoice_start_number;
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

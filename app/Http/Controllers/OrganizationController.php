<?php

namespace App\Http\Controllers;

use App\Http\Requests\Organization\OrganizationRequest;
use App\Models\Organization;
use App\Models\Transactions;
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

            if ($request->opening_cash_balance < 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Opening cash balance cannot be negative',
                ], 400);
            }

            $organization->name = $request->name;
            $organization->description = $request->description;
            $organization->address = $request->address;
            $organization->currency = $request->currency;
            $organization->invoice_prefix = $request->invoice_prefix;
            $organization->opening_cash_balance = $request->opening_cash_balance;

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

    public function showTransactions(Request $request)
    {
        try {
            $transactions = Transactions::where('payment_method', 'cash')->with(['bill.vendor', 'invoice.customer'])
                ->whereMonth('transaction_date', $request->month)
                ->whereYear('transaction_date', $request->year)
                ->get();

            return response()->json([
                'success' => true,
                'message' => 'Cash transactions retrieved successfully',
                'result' => $transactions
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

<?php

namespace App\Http\Controllers;

use App\Models\BankAccounts;
use DB;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class BankAccountsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = BankAccounts::query();
            if ($request->has('search')) {
                $search = $request->search;
                $query->with('bank')
                    ->where(function ($q) use ($search) {
                        $q->where('account_name', 'like', '%' . $search . '%')
                            ->orWhere('account_number', 'like', '%' . $search . '%')
                            ->orWhere('account_routing_number', 'like', '%' . $search . '%')
                            ->orWhere('branch', 'like', '%' . $search . '%');
                    });
            }
            return response()->json([
                'success' => true,
                'message' => 'Bank Accounts retrieved successfully',
                'result' => $query->paginate(10)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function all(Request $request)
    {
        try {
            $query = BankAccounts::all();

            return response()->json([
                'success' => true,
                'message' => 'Bank Accounts retrieved successfully',
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
            if($request->opening_bank_balance < 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Opening bank balance cannot be negative',
                ], 400);
            }

            $bank_account = new BankAccounts();
            $bank_account->account_name = $request->account_name;
            $bank_account->account_number = $request->account_number;
            $bank_account->account_routing_number = $request->account_routing_number;
            $bank_account->branch = $request->branch;
            $bank_account->opening_bank_balance = $request->opening_bank_balance;
            $bank_account->bank_id = $request->bank_id;
            $bank_account->save();
            return response()->json([
                'success' => true,
                'message' => 'Bank Account created successfully',
                'result' => $bank_account
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
                'message' => 'Bank Account retrieved successfully',
                'result' => BankAccounts::with('bank')->find($id)
            ], 200);
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
    public function showTransactions(Request $request, $id)
    {
        try {
            return response()->json([
                'success' => true,
                'message' => 'Bank Account retrieved successfully',
                'result' => BankAccounts::with('transactions.invoice', 'transactions.bill', 'bank')->whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->find($id)
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
    public function edit(BankAccounts $bankAccounts)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        try {
            $bank_account = BankAccounts::find($request->id);
            $bank_account->account_name = $request->account_name;
            $bank_account->account_number = $request->account_number;
            $bank_account->account_routing_number = $request->account_routing_number;
            $bank_account->branch = $request->branch;
            $bank_account->bank_id = $request->bank_id;
            $bank_account->save();
            return response()->json([
                'success' => true,
                'message' => 'Bank Account updated successfully',
                'result' => $bank_account
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
    public function destroy(BankAccounts $bankAccounts)
    {
        //
    }
}

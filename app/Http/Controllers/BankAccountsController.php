<?php

namespace App\Http\Controllers;

use App\Models\BankAccounts;
use App\Models\Organization;
use App\Models\Transactions;
use Illuminate\Support\Facades\DB;
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
            if ($request->opening_bank_balance < 0) {
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

    public function withdrawAmount(Request $request, $bank_account_id)
    {
        try {

            $bank_account = BankAccounts::find($bank_account_id);
            if (!$bank_account) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank Account not found',
                ], 404);
            }

            if ($bank_account->opening_bank_balance < $request->amount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient balance',
                ], 400);
            }

            DB::transaction(function () use ($bank_account, $request) {

                $bank_account->opening_bank_balance -= $request->amount;
                $bank_account->save();
                $organization = Organization::find(1);
                $organization->opening_cash_balance += $request->amount;
                $organization->save();

                $debit_transaction = new Transactions();
                $debit_transaction->amount = $request->amount;
                $debit_transaction->current_amount = $request->amount;
                $debit_transaction->transaction_type = 'deposit';
                $debit_transaction->transaction_date = now();
                $debit_transaction->payment_method = 'cash';
                $debit_transaction->is_debit = true;
                $debit_transaction->transaction_note = $request->transaction_note ?? 'Cash deposit';
                $debit_transaction->save();

                $credit_transaction = new Transactions();
                $credit_transaction->amount = $request->amount;
                $credit_transaction->current_amount = $request->amount;
                $credit_transaction->transaction_type = 'withdraw';
                $credit_transaction->transaction_date = now();
                $credit_transaction->payment_method = 'bank';
                $credit_transaction->is_debit = false;
                $credit_transaction->transaction_note = $request->transaction_note ?? 'Bank withdrawal';
                $credit_transaction->bank_account_id = $bank_account->id;
                $credit_transaction->save();
            });


            return response()->json([
                'success' => true,
                'message' => 'Amount withdrawn successfully',
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

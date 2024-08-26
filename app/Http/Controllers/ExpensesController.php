<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpenseResource;
use App\Models\BankAccounts;
use App\Models\Customer;
use App\Models\Expense;
use App\Models\Expenses;
use App\Models\Organization;
use App\Models\Transactions;
use App\Models\Vendor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpensesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        try {
            $expense_query = Expense::query();

            $expense_query->whereMonth('date', $request->month)
                ->whereYear('date', $request->year);

            if ($request->search) {
                $expense_query->where(function ($query) use ($request) {
                    $query->where('description', 'like', '%' . $request->search . '%')
                        ->orWhere('expense_number', 'like', '%' . $request->search . '%');
                });
            }

            $expense_query->orderBy('created_at', 'desc');

            return response()->json([
                'success' => true,
                'message' => 'Expenses retrieved successfully',
                'result' => $expense_query->paginate(10)
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
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
            $customer = null;
            $vendor = null;

            if ($request->customer_id) {
                $customer = Customer::find($request->customer_id);
                if (!$customer) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Customer not found!',
                    ], 404);
                }
            }

            if ($request->vendor_id) {
                $vendor = Vendor::find($request->vendor_id);
                if (!$vendor) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Vendor not found!',
                    ], 404);
                }
            }

            if ($request->payment_method == 'bank' && !$request->bank_account_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank account is required for bank payment method',
                ], 400);
            }

            DB::transaction(function () use ($vendor, $customer, $request) {
                if ($request->payment_method == 'cash') {
                    $organization = Organization::find(1);

                    // Check if the organization has sufficient cash balance
                    if ($organization->opening_cash_balance < $request->amount) {
                        throw new Exception('Insufficient cash balance!');
                    }

                    $organization->opening_cash_balance -= $request->amount;
                    $organization->save();

                } else if ($request->payment_method == 'bank') {
                    $bank_account = BankAccounts::find($request->bank_account_id);

                    if (!$bank_account) {
                        throw new Exception('Bank Account not found!');
                    }

                    // Check if the bank account has sufficient bank balance
                    if ($bank_account->opening_bank_balance < $request->amount) {
                        throw new Exception('Insufficient bank balance!');
                    }

                    $bank_account->opening_bank_balance -= $request->amount;
                    $bank_account->save();
                }

                $expense_count = Expense::count();
                $expense_number = 'EXP-00' . ($expense_count + 1);
                $expense = new Expense();
                $expense->expense_number = $expense_number;
                $expense->description = $request->description;
                $expense->date = $request->expense_date;
                $expense->amount = $request->amount;
                $expense->currency = $request->currency;
                $expense->tax = $request->tax;
                $expense->expense_note = $request->expense_note;
                $expense->chart_of_account_id = $request->chart_of_account_id;
                $expense->vendor_id = $vendor ? $vendor->id : null;
                $expense->customer_id = $customer ? $customer->id : null;

                $expense->save();

                // Create the first transaction (debit)
                $transaction = new Transactions();
                $transaction->amount = $request->amount;
                $transaction->current_amount = $request->amount;
                $transaction->transaction_type = 'expense';
                $transaction->transaction_date = Now();
                $transaction->payment_method = $request->payment_method;
                $transaction->is_debit = true;
                $transaction->invoice_number = $expense_number;
                $transaction->transaction_note = $request->expense_note;
                $transaction->expense_id = $expense->id;
                $transaction->chart_of_account_id = $request->chart_of_account_id;
                $transaction->bank_account_id = $request->bank_account_id;
                $transaction->save();

                // Create the second transaction (credit)
                $transaction = new Transactions();
                $transaction->amount = $request->amount;
                $transaction->current_amount = $request->amount;
                $transaction->transaction_type = 'expense';
                $transaction->transaction_date = Now();
                $transaction->payment_method = $request->payment_method;
                $transaction->is_debit = false;
                $transaction->invoice_number = $expense_number;
                $transaction->transaction_note = $request->expense_note;
                $transaction->expense_id = $expense->id;
                $transaction->chart_of_account_id = $request->chart_of_account_id;
                $transaction->bank_account_id = $request->bank_account_id;
                $transaction->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Expense created successfully',
                'result' => ExpenseResource::make($request),
            ], 201);

        } catch (Exception $e) {
            // Log the error here for debugging
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $expense = Expense::with(['transactions.bank_account', 'vendor', 'customer'])->find($id);
        if (!$expense) {
            return response()->json([
                'success' => false,
                'message' => 'Expense not found!',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Expense retrieved successfully',
            'expense' => $expense
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Expense $expense)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Expense $expense)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Expense $expense)
    {
        //
    }
}

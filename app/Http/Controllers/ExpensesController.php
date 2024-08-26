<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExpenseResource;
use App\Models\Customer;
use App\Models\Expense;
use App\Models\Expenses;
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
        // get expenses paginated with search query of expense number or description
        $expense_query = Expense::query();
        if($request->search){
            $expense_query->where('description', 'like', '%'.$request->search.'%')
                ->orWhere('expense_number', 'like', '%'.$request->search.'%');
        }
        // order by desc
        $expense_query->orderBy('created_at', 'desc');
        
        return response()->json([
            'success' => true,
            'message' => 'Expense retrieved successfully',
            'expenses' => $expense_query->paginate(10)
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
        $customer = null;
        $vendor = null;
        if($request->customer_id){
        $customer = Customer::find($request->customer_id);
            if (!$customer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Customer not found!',
                ], 404);
            }
        }

        if($request->vendor_id){
            $vendor = Vendor::find($request->vendor_id);
            if (!$vendor) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vendor not found!',
                ], 404);
            }
        }
        DB::transaction(function () use ($vendor, $customer, $request) {
            $expense_count = Expense::count();
            $expense_number = 'EXP-00' . $expense_count + 1;
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

            $transaction = new Transactions();
            $transaction->amount = $request->amount;
            $transaction->current_amount = $request->amount;
            $transaction->transaction_type = 'expense';
            $transaction->transaction_date = Now();
            $transaction->payment_method = $request->payment_method;
            $transaction->is_debit = true;
            $transaction->invoice_number = $expense_number;
            $transaction->transaction_note = $request->transaction_note;
            $transaction->expense_id = $expense->id;
            $transaction->chart_of_account_id = $request->chart_of_account_id;
            $transaction->bank_account_id = $request->bank_account_id;
            $transaction->save();

            $transaction = new Transactions();
            $transaction->amount = $request->amount;
            $transaction->current_amount = $request->amount;
            $transaction->transaction_type = 'expense';
            $transaction->transaction_date = Now();
            $transaction->payment_method = $request->payment_method;
            $transaction->is_debit = false;
            $transaction->invoice_number = $expense_number;
            $transaction->transaction_note = $request->transaction_note;
            $transaction->expense_id = $expense->id;
            $transaction->chart_of_account_id = $request->chart_of_account_id;
            $transaction->bank_account_id = $request->bank_account_id;
            $transaction->save();
        });
        return response()->json([
            'success' => true,
            'message' => 'Expense created successfully',
            'result' => ExpenseResource::make($request)
        ], 201);
    } catch (Exception $e) {
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

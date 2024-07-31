<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ManualJournalResource;
use App\Models\Bill;
use App\Models\ChartOfAccount;
use App\Models\Invoice;
use App\Models\Organization;
use App\Models\Transactions;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Invoices retrieved successfully',
            'result' => InvoiceResource::collection(Invoice::paginate($request->limit ?? 10))
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
            DB::transaction(function () use ($request) {

                $organization_invoice_prefix = Organization::find(1)->invoice_prefix;
                $organization_invoice_number = Organization::find(1)->invoice_number;

                if(!$organization_invoice_prefix || !$organization_invoice_number) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Please update Organization Invoice Prefix or Number first!',
                    ], 404);
                }

                $total_invoice_count = Invoice::count();
                $invoice_number = $organization_invoice_prefix . '-' . ($organization_invoice_number + $total_invoice_count);

                $invoice = new Invoice();
                $invoice->invoice_number = $invoice_number;
                $invoice->invoice_issue_date = $request->invoice_issue_date;
                $invoice->due_date = $request->due_date;
                $invoice->destination = $request->destination;
                $invoice->master_air_way_bill = $request->master_air_way_bill;
                $invoice->master_air_way_bill_fee = $request->master_air_way_bill_fee;
                $invoice->cartoon_amount = $request->cartoon_amount;
                $invoice->gross_weight = $request->gross_weight;
                $invoice->chargeable_weight = $request->chargeable_weight;
                $invoice->invoice_rate = $request->invoice_rate;
                $invoice->freight_amount = $request->freight_amount;
                $invoice->invoice_thc = $request->invoice_thc;
                $invoice->invoice_ssc = $request->invoice_ssc;
                $invoice->invoice_cd = $request->invoice_cd;
                $invoice->invoice_cgc = $request->invoice_cgc;
                $invoice->invoice_total_usd = $request->invoice_total_usd;
                $invoice->invoice_ait = $request->invoice_ait;
                $invoice->invoice_vat = $request->invoice_vat;
                $invoice->invoice_exchange_rate = $request->invoice_exchange_rate;
                $invoice->invoice_payable_bdt = $request->invoice_payable_bdt;
                $invoice->invoice_paid_amount = $request->invoice_paid_amount;
                $invoice->invoice_due_balance = $invoice->invoice_payable_bdt - $invoice->invoice_paid_amount;
                $invoice->invoice_notes = $request->invoice_notes;
                $invoice->currency = $request->currency;
                $invoice->customer_id = $request->customer_id;
                $invoice->chart_of_account_id = $request->chart_of_account_id;
                $invoice->invoice_payment_method = $request->invoice_payment_method;
                if(
                    $request->invoice_payment_method == 'bank' && !$request->invoice_bank_account_id
                    ) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bank Account Required for bank transactions',
                    ], 400);
                } else if(
                    $request->invoice_payment_method == 'bank' && $request->invoice_bank_account_id
                    ) {
                        $invoice->invoice_bank_account_id = $request->invoice_bank_account_id;
                    }
                $invoice->save();

                $accounts_receivable_chart_of_account = ChartOfAccount::where('slug', 'accounts-receivable')->first();

                $invoice_debit_transaction = [
                    'amount' => $request->invoice_paid_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => true,
                    'invoice_number' => $request->invoice_number,
                    'chart_of_account_id' => $accounts_receivable_chart_of_account->id,
                    'invoice_id' => $invoice->id,
                ];

                $invoice_credit_transaction = [
                    'amount' => $request->invoice_due_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => false,
                    'invoice_number' => $request->invoice_number,
                    'chart_of_account_id' => $request->chart_of_account_id,
                    'invoice_id' => $invoice->id,
                ];

                $debit = new Transactions();
                $debit->fill($invoice_debit_transaction);
                $debit->save();

                $credit = new Transactions();
                $credit->fill($invoice_credit_transaction);
                $credit->save();

                $bill = new Bill();
                $bill->invoice_number = $invoice_number;
                $bill->invoice_issue_date = $request->invoice_issue_date;
                $bill->due_date = $request->due_date;
                $bill->destination = $request->destination;
                $bill->master_air_way_bill = $request->master_air_way_bill;
                $bill->master_air_way_bill_fee = $request->master_air_way_bill_fee;
                $bill->cartoon_amount = $request->cartoon_amount;
                $bill->gross_weight = $request->gross_weight;
                $bill->chargeable_weight = $request->chargeable_weight;
                $bill->bill_rate = $request->bill_rate;
                $bill->bill_cgc = $request->bill_cgc;
                $bill->bill_handling_fee = $request->bill_handling_fee;
                $bill->bill_total_usd = $request->bill_total_usd;
                $bill->others = $request->others;
                $bill->bill_exchange_rate = $request->bill_exchange_rate;
                $bill->bill_amount = $request->bill_amount;
                $bill->bill_received_amount = $request->bill_received_amount;
                $bill->bill_due_balance = $bill->bill_amount - $bill->bill_received_amount;
                $bill->bill_notes = $request->bill_notes;
                $bill->currency = $request->currency;
                $bill->bill_payment_method = $request->bill_payment_method;
                // $bill->isPaid = $request->isPaid;
                $bill->vendor_id = $request->vendor_id;
                $bill->chart_of_account_id = $request->chart_of_account_id;

                if(
                    $request->bill_payment_method == 'bank' && !$request->bill_bank_account_id
                    ) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bank Account Required for bank transactions',
                    ], 400);
                } else if(
                    $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
                    ) {
                        $bill->bill_bank_account_id = $request->bill_bank_account_id;
                    }
                $bill->save();

                $accounts_payable_chart_of_account = ChartOfAccount::where('slug', 'accounts-payable')->first();

                $bill_credit_transaction = [
                    'amount' => $request->bill_received_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => false,
                    'invoice_number' => $request->invoice_number,
                    'chart_of_account_id' => $accounts_payable_chart_of_account->id,
                    'bill_id' => $bill->id,
                ];

                $bill_debit_transaction = [
                    'amount' => $request->bill_due_balance,
                    'transaction_type' => 'bill',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => true,
                    'invoice_number' => $request->invoice_number,
                    'chart_of_account_id' => $request->chart_of_account_id,
                    'bill_id' => $bill->id,
                ];

                $credit = new Transactions();
                $credit->fill($bill_credit_transaction);
                $credit->save();

                $debit = new Transactions();
                $debit->fill($bill_debit_transaction);
                $debit->save();

                return response()->json([
                    'success' => true,
                    'message' => 'Invoice created successfully',
                    'result' => InvoiceResource::make($invoice)
                ], 201);
            });
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
        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::make(Invoice::findOrFail($id))
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        //
    }
}

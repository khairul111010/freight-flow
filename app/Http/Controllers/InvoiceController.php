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
        // dd('here');
        try {
            $organization = Organization::find(1);
            $organization_invoice_prefix = $organization->invoice_prefix;
            $organization_invoice_number = $organization->invoice_start_number;

            if (is_null($organization_invoice_prefix) || is_null($organization_invoice_number)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Please update Organization Invoice Prefix or Number first!',
                ], 404);
            }

            if (
                $request->invoice_payment_method == 'bank' && !$request->invoice_bank_account_id
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank Account Required for bank transactions',
                ], 400);
            }

            if (
                $request->bill_payment_method == 'bank' && !$request->bill_bank_account_id
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank Account Required for bank transactions',
                ], 400);
            }

            DB::transaction(function () use (
                $organization_invoice_prefix,
                $organization_invoice_number,
                $request
            ) {
                $total_invoice_count = Invoice::count();
                $invoice_number = $organization_invoice_prefix . '-' . ($organization_invoice_number + $total_invoice_count);

                $invoice = new Invoice();
                $invoice->invoice_number = $invoice_number;
                $invoice->invoice_issue_date = $request->invoice_issue_date;
                $invoice->invoice_due_date = $request->invoice_due_date;
                $invoice->destination = $request->destination;
                $invoice->master_air_way_bill = $request->master_air_way_bill;
                $invoice->master_air_way_bill_fee = $request->master_air_way_bill_fee;
                $invoice->unit = $request->unit;
                $invoice->cartoon_amount = $request->cartoon_amount;
                $invoice->gross_weight = $request->gross_weight;
                $invoice->chargeable_weight = $request->chargeable_weight;
                $invoice->kg = $request->kg;
                $invoice->invoice_rate = $request->invoice_rate;
                $invoice->invoice_cgc = $request->invoice_cgc;
                $invoice->invoice_dtc = $request->invoice_dtc;
                $invoice->invoice_ait = $request->invoice_ait;
                $invoice->invoice_vat = $request->invoice_vat;
                $invoice->others = $request->others;
                $invoice->invoice_total_usd = $request->invoice_total_usd;
                $invoice->invoice_exchange_rate = $request->invoice_exchange_rate;

                $invoice->invoice_receivable_amount_bdt = $request->invoice_receivable_amount_bdt;
                $invoice->invoice_received_amount = $request->invoice_received_amount;

                $invoice->invoice_due_balance = $invoice->invoice_receivable_amount_bdt - $invoice->invoice_received_amount;

                $invoice->invoice_notes = $request->invoice_notes;
                $invoice->invoice_payment_method = $request->invoice_payment_method;
                // $invoice->currency = $request->currency;
                $invoice->customer_id = $request->customer_id;
                $invoice->chart_of_account_id = $request->chart_of_account_id;
                if (
                    $request->invoice_payment_method == 'bank' && $request->invoice_bank_account_id
                ) {
                    $invoice->invoice_bank_account_id = $request->invoice_bank_account_id;
                }

                $invoice->save();

                $accounts_receivable_chart_of_account = ChartOfAccount::where('slug', 'accounts-receivable')->first();

                $invoice_debit_transaction = [
                    'amount' => $request->invoice_received_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => true,
                    'invoice_number' => $invoice_number,
                    'chart_of_account_id' => $accounts_receivable_chart_of_account->id,
                    'invoice_id' => $invoice->id,
                ];

                $invoice_credit_transaction = [
                    'amount' => $invoice->invoice_due_balance,
                    'transaction_type' => 'invoice',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => false,
                    'invoice_number' => $invoice_number,
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
                $bill->bill_issue_date = $request->bill_issue_date;
                $bill->bill_due_date = $request->bill_due_date;
                $bill->destination = $request->destination;
                $bill->master_air_way_bill = $request->master_air_way_bill;
                $bill->master_air_way_bill_fee = $request->master_air_way_bill_fee;
                $bill->unit = $request->unit;
                $bill->cartoon_amount = $request->cartoon_amount;
                $bill->gross_weight = $request->gross_weight;
                $bill->chargeable_weight = $request->chargeable_weight;
                $bill->bill_rate = $request->bill_rate;

                $freight_amount = $bill->chargeable_weight * $bill->bill_rate;
                $bill->bill_freight_amount = $freight_amount;

                $bill->bill_thc = $request->bill_thc;
                $bill->bill_ssc = $request->bill_ssc;
                $bill->bill_cd = $request->bill_cd;
                $bill->bill_cgc = $request->bill_cgc;
                $bill->bill_ams = $request->bill_ams;
                $bill->bill_itt = $request->bill_itt;
                $bill->bill_total_usd = $request->bill_total_usd;
                $bill->bill_ait = $request->bill_ait;
                $bill->bill_vat = $request->bill_vat;
                $bill->bill_exchange_rate = $request->bill_exchange_rate;


                // if($request->bill_total_usd && $request->bill_exchange_rate) {
                //     $bill->bill_payable_bdt = ($bill->bill_total_usd + $bill->bill_ait + $bill->bill_vat) * $bill->bill_exchange_rate;    
                // } else if(
                //     !$request->bill_total_usd && !$request->bill_exchange_rate
                //     ) {
                //     $bill->bill_payable_bdt = $request->bill_payable_bdt;
                // }

                $bill->bill_payable_bdt = $request->bill_payable_bdt;
                $bill->bill_paid_amount = $request->bill_paid_amount;

                $bill->bill_due_balance = $bill->bill_payable_bdt - $bill->bill_paid_amount;

                $bill->bill_notes = $request->bill_notes;
                // $bill->currency = $request->currency;
                $bill->bill_payment_method = $request->bill_payment_method;
                // $bill->isPaid = $request->isPaid;
                $bill->vendor_id = $request->vendor_id;
                $bill->chart_of_account_id = $request->chart_of_account_id;

                if (
                    $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
                ) {
                    $bill->bill_bank_account_id = $request->bill_bank_account_id;
                }
                $bill->save();

                $accounts_payable_chart_of_account = ChartOfAccount::where('slug', 'accounts-payable')->first();

                $bill_credit_transaction = [
                    'amount' => $request->bill_paid_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => false,
                    'invoice_number' => $invoice_number,
                    'chart_of_account_id' => $accounts_payable_chart_of_account->id,
                    'bill_id' => $bill->id,
                ];

                $bill_debit_transaction = [
                    'amount' => $bill->bill_due_balance,
                    'transaction_type' => 'bill',
                    'transaction_date' => $request->invoice_issue_date,
                    'is_debit' => true,
                    'invoice_number' => $invoice_number,
                    'chart_of_account_id' => $request->chart_of_account_id,
                    'bill_id' => $bill->id,
                ];

                $credit = new Transactions();
                $credit->fill($bill_credit_transaction);
                $credit->save();

                $debit = new Transactions();
                $debit->fill($bill_debit_transaction);
                $debit->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'result' => InvoiceResource::make($request)
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

        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::make(Invoice::findOrFail($id))
        ], 200);
    }

    public function search($invoice_number)
    {
        $invoice = Invoice::where('invoice_number', 'like', '%' . $invoice_number . '%')->get();
        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::collection($invoice)
        ], 200);
    }
    
    public function getInvoiceByCustomer($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::collection(Invoice::where('customer_id', $id)->get())
        ], 200);
    }

    public function getInvoiceByInvoiceNumber($invoice_number)
    {
        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::make(Invoice::where('invoice_number', $invoice_number)->first())
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


    // Bill API

    // paginate bill
    public function getBill(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::collection(Bill::paginate($request->limit ?? 10))
        ], 200);
    }

    public function getBillByVendor($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::collection(Bill::where('vendor_id', $id)->get())
        ], 200);
    }

    public function searchBill($invoice_number)
    {
        $bill = Bill::where('invoice_number', 'like', '%' . $invoice_number . '%')->get();
        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::collection($bill)
        ], 200);
    }

    public function getBillByBillId($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::make(Bill::findOrFail($id))
        ], 200);
    }
}

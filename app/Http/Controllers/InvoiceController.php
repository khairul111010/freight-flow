<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Http\Resources\ManualJournalResource;
use App\Models\BankAccounts;
use App\Models\Bill;
use App\Models\ChartOfAccount;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Organization;
use App\Models\Transactions;
use App\Models\Vendor;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
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
        // order by desc

        $query = Invoice::query();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('destination', 'LIKE', '%' . $search . '%')
                    ->orWhere('master_air_way_bill', 'LIKE', '%' . $search . '%');
            });
        }
        $query->orderBy('created_at', 'desc');

        return response()->json([
            'success' => true,
            'message' => 'Invoices retrieved successfully',
            'result' => $query->paginate(10)
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
            $organization = Organization::find(1);

            if (!$organization) {
                return response()->json([
                    'success' => false,
                    'message' => 'Organization not found!',
                ], 404);
            }

            if (is_null($organization->invoice_prefix) || is_null($organization->invoice_start_number)) {
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
                    'message' => 'Bank Account Required for invoice - bank transactions',
                ], 400);
            }

            if (
                $request->bill_payment_method == 'cash' && $organization->opening_cash_balance < $request->bill_paid_amount
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Insufficient balance in cash account!',
                ], 400);
            }

            if (
                $request->bill_payment_method == 'bank' && !$request->bill_bank_account_id
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bank Account Required for bill - bank transactions',
                ], 400);
            }

            if (
                $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
            ) {
                $bank_account = BankAccounts::find($request->bill_bank_account_id);
                if (!$bank_account) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bank Account not found!',
                    ], 404);
                }

                if($bank_account->opening_bank_balance < $request->bill_paid_amount) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient balance in bank account!',
                    ], 400);
                }
            }

            $customer = Customer::find($request->customer_id);
            if (!$customer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Customer not found!',
                ], 404);
            }

            $vendor = Vendor::find($request->vendor_id);
            if(!$vendor) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vendor not found!',
                ], 404);
            }

            DB::transaction(function () use ($organization, $request) {
                $total_invoice_count = Invoice::count();
                $invoice_number = $organization->invoice_prefix . '-' . ($organization->invoice_start_number + $total_invoice_count);

                $invoice = new Invoice();
                $invoice->invoice_number = $invoice_number;
                $invoice->issue_date = $request->issue_date;
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

                $invoice->invoice_freight_amount = $invoice->chargeable_weight * $invoice->invoice_rate;

                $invoice->thc = $request->thc;
                $invoice->ssc = $request->ssc;
                $invoice->cd = $request->cd;
                $invoice->cgc = $request->cgc;
                $invoice->dtc = $request->dtc;
                $invoice->ait = $request->ait;
                $invoice->ams = $request->ams;
                $invoice->itt = $request->itt;
                $invoice->others = $request->others;
                $invoice->invoice_vat = $request->invoice_vat;
                $invoice->invoice_total_usd = $request->invoice_total_usd;
                $invoice->exchange_rate = $request->exchange_rate;

                $invoice->invoice_receivable_amount_bdt = $request->invoice_receivable_amount_bdt;
                $invoice->invoice_received_amount = $request->invoice_received_amount;

                $invoice->invoice_discounted_amount = $request->invoice_discounted_amount ?? 0;
                
                $invoice->invoice_due_balance = $invoice->invoice_receivable_amount_bdt - $invoice->invoice_received_amount - $invoice->invoice_discounted_amount;



                $invoice->invoice_note = $request->invoice_note;
                // $invoice->currency = $request->currency;
                $invoice->customer_id = $request->customer_id;
                $invoice->chart_of_account_id = $request->invoice_chart_of_account_id;

                if($request->invoice_payment_method == 'cash') {
                    $organization->opening_cash_balance += $request->invoice_received_amount;

                    $organization->save();
                } else if($request->invoice_payment_method == 'bank') {
                    $bank_account = BankAccounts::find($request->invoice_bank_account_id);
                    $bank_account->opening_bank_balance += $request->invoice_received_amount;

                    $bank_account->save();
                }

                // if (
                //     $request->invoice_payment_method == 'bank' && $request->invoice_bank_account_id
                // ) {
                //     $invoice->invoice_bank_account_id = $request->invoice_bank_account_id;
                // }

                $invoice->save();

                $accounts_receivable_chart_of_account = ChartOfAccount::where('slug', 'accounts-receivable')->first();


                $invoice_debit_transaction = [
                    'amount' => $invoice->invoice_due_balance,
                    'current_amount' => $request->invoice_received_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => Now(),
                    'payment_method' => $request->invoice_payment_method,
                    'is_debit' => true,
                    'invoice_number' => $invoice_number,
                    'transaction_note' => $request->invoice_transaction_note,
                    'chart_of_account_id' => $accounts_receivable_chart_of_account->id,
                    'bank_account_id' => $request->invoice_bank_account_id,
                    'invoice_id' => $invoice->id,
                ];

                $invoice_credit_transaction = [
                    'amount' => $invoice->invoice_received_amount,
                    'current_amount' => $request->invoice_received_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => Now(),
                    'payment_method' => $request->invoice_payment_method,
                    'is_debit' => false,
                    'invoice_number' => $invoice_number,
                    'transaction_note' => $request->invoice_transaction_note,
                    'chart_of_account_id' => $invoice->chart_of_account_id,
                    'bank_account_id' => $request->invoice_bank_account_id,
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
                $bill->issue_date = $request->issue_date;
                $bill->bill_due_date = $request->bill_due_date;
                $bill->destination = $request->destination;
                $bill->master_air_way_bill = $request->master_air_way_bill;
                $bill->master_air_way_bill_fee = $request->master_air_way_bill_fee;
                $bill->unit = $request->unit;
                $bill->cartoon_amount = $request->cartoon_amount;
                $bill->gross_weight = $request->gross_weight;
                $bill->chargeable_weight = $request->chargeable_weight;
                $bill->bill_rate = $request->bill_rate;

                $bill->bill_freight_amount = $bill->chargeable_weight * $bill->bill_rate;

                $bill->thc = $request->thc;
                $bill->ssc = $request->ssc;
                $bill->cd = $request->cd;
                $bill->cgc = $request->cgc;
                $bill->dtc = $request->dtc;
                $bill->ait = $request->ait;
                $bill->ams = $request->ams;
                $bill->itt = $request->itt;
                $bill->others = $request->others;
                $bill->bill_vat = $request->bill_vat;
                $bill->bill_total_usd = $request->bill_total_usd;
                $bill->exchange_rate = $request->exchange_rate;


                // if($request->bill_total_usd && $request->bill_exchange_rate) {
                //     $bill->bill_payable_bdt = ($bill->bill_total_usd + $bill->bill_ait + $bill->bill_vat) * $bill->bill_exchange_rate;    
                // } else if(
                //     !$request->bill_total_usd && !$request->bill_exchange_rate
                //     ) {
                //     $bill->bill_payable_bdt = $request->bill_payable_bdt;
                // }

                $bill->bill_payable_bdt = $request->bill_payable_bdt;
                $bill->bill_paid_amount = $request->bill_paid_amount;

                $bill->bill_discounted_amount = $request->bill_discounted_amount ?? 0;

                $bill->bill_due_balance = $bill->bill_payable_bdt - $bill->bill_paid_amount - $bill->bill_discounted_amount;

                $bill->bill_note = $request->bill_note;

                $bill->vendor_id = $request->vendor_id;
                $bill->chart_of_account_id = $request->bill_chart_of_account_id;

                // if (
                //     $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
                // ) {
                //     $bill->bill_bank_account_id = $request->bill_bank_account_id;
                // }

                if($request->bill_payment_method == 'cash') {
                    $organization->opening_cash_balance -= $request->bill_paid_amount;

                    $organization->save();
                } else if($request->bill_payment_method == 'bank') {
                    $bank_account = BankAccounts::find($request->bill_bank_account_id);
                    $bank_account->opening_bank_balance -= $request->bill_paid_amount;

                    $bank_account->save();
                }

                $bill->save();

                $accounts_payable_chart_of_account = ChartOfAccount::where('slug', 'accounts-payable')->first();

                $bill_credit_transaction = [
                    'amount' => $bill->bill_payable_bdt,
                    'current_amount' => $request->bill_paid_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => Now(),
                    'payment_method' => $request->bill_payment_method,
                    'is_debit' => false,
                    'invoice_number' => $invoice_number,
                    'transaction_note' => $request->bill_transaction_note,
                    'chart_of_account_id' => $accounts_payable_chart_of_account->id,
                    'bank_account_id' => $request->bill_bank_account_id,
                    'bill_id' => $bill->id,
                ];

                $bill_debit_transaction = [
                    'amount' => $bill->bill_paid_amount,
                    'current_amount' => $request->bill_paid_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => Now(),
                    'payment_method' => $request->bill_payment_method,
                    'is_debit' => true,
                    'invoice_number' => $invoice_number,
                    'transaction_note' => $request->bill_transaction_note,
                    'chart_of_account_id' => $bill->chart_of_account_id,
                    'bank_account_id' => $request->bill_bank_account_id,
                    'bill_id' => $bill->id,
                ];


                $debit = new Transactions();
                $debit->fill($bill_debit_transaction);
                $debit->save();

                $credit = new Transactions();
                $credit->fill($bill_credit_transaction);
                $credit->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'result' => InvoiceResource::make($request)
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
        $invoice = Invoice::with(['transactions.bank_account', 'customer'])->findOrFail($id);
        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => $invoice
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function pdf($id)
    {
        $organization = Organization::find(1);
        $invoice = Invoice::with('customer')->findOrFail($id);
        $data = ['logo' => asset($organization->logo), 'name' => $organization->name, 'description' => $organization->description, 'address' => $organization->address, 'invoice' => $invoice];
        $pdf = Pdf::loadView('invoice', $data);
        return $pdf->download($invoice->invoice_number . "-" . Carbon::today() . '.pdf');
    }

    public function search($invoice_number)
    {
        $invoice = Invoice::with('transactions')->where('invoice_number', 'like', '%' . $invoice_number . '%')->get();

        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::collection($invoice)
        ], 200);
    }

    public function getInvoiceByCustomer($id, Request $request)
    {

        $query = Invoice::query();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('destination', 'LIKE', '%' . $search . '%')
                    ->orWhere('master_air_way_bill', 'LIKE', '%' . $search . '%');
            });
        }
        $query->where('customer_id', $id);
        return response()->json([
            'success' => true,
            'message' => 'Invoices retrieved successfully',
            'result' => $query->paginate(10)
        ], 200);

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Invoice retrieved successfully',
        //     'result' => InvoiceResource::collection(Invoice::where('customer_id', $id)->get())
        // ], 200);
    }

    public function getInvoiceByInvoiceNumber($invoice_number)
    {
        $invoice = Invoice::with('transactions')->where('invoice_number', $invoice_number)->firstOrFail();

        return response()->json([
            'success' => true,
            'message' => 'Invoice retrieved successfully',
            'result' => InvoiceResource::make($invoice)
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
    public function updateInvoiceAmount(Request $request, $invoiceId)
    {
        try {

            $invoice = Invoice::findOrFail($invoiceId);

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found!',
                ], 404);
            }

            if($request->invoice_payment_method == 'cash') {
                $organization = Organization::find(1);
                
                $organization->opening_cash_balance += $request->invoice_received_amount;
                $organization->save();    
            }
            else if ($request->invoice_payment_method == 'bank' && $request->invoice_bank_account_id) {
                $bank_account = BankAccounts::find($request->invoice_bank_account_id);

                if (!$bank_account) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bank Account not found!',
                    ], 404);
                }

                $bank_account->opening_bank_balance += $request->invoice_received_amount;
                $bank_account->save();
            }

            

            // Update the received amount
            $invoice->invoice_received_amount += $request->invoice_received_amount;
            

            // Recalculate the due balance
            $invoice->invoice_due_balance = $invoice->invoice_receivable_amount_bdt - $invoice->invoice_received_amount;

            if ($invoice->invoice_receivable_amount_bdt < $invoice->invoice_received_amount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Received amount cannot be greater than due balance!',
                ], 400);
            }

            DB::transaction(function () use ($request, $invoice) {


                $invoice->chart_of_account_id = $request->chart_of_account_id;


                if (!$invoice->chart_of_account_id && $request->invoice_payment_method == 'cash') {
                    $sales_chart_of_account = ChartOfAccount::where('slug', 'sales')->first();
                    $invoice->chart_of_account_id = $sales_chart_of_account->id;
                }

                if (
                    $request->invoice_payment_method == 'bank' && $request->invoice_bank_account_id
                ) {
                    $bank_transfer_chart_of_account = ChartOfAccount::where('slug', 'bank-transfers')->first();
                    $invoice->chart_of_account_id = $bank_transfer_chart_of_account->id;
                }

                // Save the updated invoice
                $invoice->save();

                $accounts_receivable_chart_of_account = ChartOfAccount::where('slug', 'accounts-receivable')->first();

                $invoice_debit_transaction = [
                    'amount' => $invoice->invoice_due_balance,
                    'current_amount' => $request->invoice_received_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => Now(),
                    'payment_method' => $request->invoice_payment_method,
                    'is_debit' => true,
                    'invoice_number' => $invoice->invoice_number,
                    'transaction_note' => $request->invoice_transaction_note,
                    'chart_of_account_id' => $accounts_receivable_chart_of_account->id,
                    'bank_account_id' => $request->invoice_bank_account_id,
                    'invoice_id' => $invoice->id,
                ];

                $invoice_credit_transaction = [
                    'amount' => $invoice->invoice_received_amount,
                    'current_amount' => $request->invoice_received_amount,
                    'transaction_type' => 'invoice',
                    'transaction_date' => Now(),
                    'payment_method' => $request->invoice_payment_method,
                    'is_debit' => false,
                    'invoice_number' => $invoice->invoice_number,
                    'transaction_note' => $request->invoice_transaction_note,
                    'chart_of_account_id' => $invoice->chart_of_account_id,
                    'bank_account_id' => $request->invoice_bank_account_id,
                    'invoice_id' => $invoice->id,
                ];

                $debit = new Transactions();
                $debit->fill($invoice_debit_transaction);
                $debit->save();

                $credit = new Transactions();
                $credit->fill($invoice_credit_transaction);
                $credit->save();

                // // Insert a new transaction record
                // $transaction = new Transactions();
                // $transaction->amount = $request->invoice_received_amount;
                // $transaction->transaction_type = 'invoice';
                // $transaction->transaction_date = now(); // or use $request->transaction_date if provided
                // $transaction->is_debit = false; // Assuming this is a credit transaction
                // $transaction->invoice_number = $invoice->invoice_number;
                // $transaction->chart_of_account_id = $request->chart_of_account_id; // Ensure this is provided in the request
                // $transaction->invoice_id = $invoice->id;
                // $transaction->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Invoice updated successfully',
                'result' => InvoiceResource::make($invoice)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
            ], 500);
        }
    }

    public function updateBillAmount(Request $request, $billId)
    {
        try {
            
            $bill = Bill::findOrFail($billId);
            
            if (!$bill) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bill not found!',
                ], 404);
            }
            
            if ($request->bill_payment_method == 'cash') {
                $organization = Organization::find(1);

                if ($organization->opening_cash_balance < $request->bill_paid_amount) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient balance in cash account!',
                    ], 400);
                }
                $organization->opening_cash_balance -= $request->bill_paid_amount;
                $organization->save();
            } else if (
                $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
                ) {
                $bank_account = BankAccounts::find($request->bill_bank_account_id);

                if (!$bank_account) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Bank Account not found!',
                    ], 404);
                }

                if($bank_account->opening_bank_balance < $request->bill_paid_amount) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Insufficient balance in bank account!',
                    ], 400);
                }

                $bank_account->opening_bank_balance -= $request->bill_paid_amount;
                $bank_account->save();
            }

            // Update the received amount
            $bill->bill_paid_amount += $request->bill_paid_amount;

            // Recalculate the due balance
            $bill->bill_due_balance = $bill->bill_payable_bdt - $bill->bill_paid_amount;

            if ($bill->bill_payable_bdt < $bill->bill_paid_amount) {
                return response()->json([
                    'success' => false,
                    'message' => 'Paid amount cannot be greater than due balance!',
                ], 400);
            }


            DB::transaction(function () use ($request, $bill) {

                $bill->chart_of_account_id = $request->chart_of_account_id;

                if (!$bill->chart_of_account_id && $request->bill_payment_method == 'cash') {
                    $petty_cash_chart_of_account = ChartOfAccount::where('slug', 'petty-cash')->first();
                    $bill->chart_of_account_id = $petty_cash_chart_of_account->id;
                }

                if (
                    $request->bill_payment_method == 'bank' && $request->bill_bank_account_id
                ) {
                    $bank_transfer_chart_of_account = ChartOfAccount::where('slug', 'bank-transfers')->first();
                    $bill->chart_of_account_id = $bank_transfer_chart_of_account->id;
                }


                // Save the updated bill
                $bill->save();

                $accounts_payable_chart_of_account = ChartOfAccount::where('slug', 'accounts-payable')->first();

                $bill_credit_transaction = [
                    'amount' => $bill->bill_due_balance,
                    'current_amount' => $request->bill_paid_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => Now(),
                    'payment_method' => $request->bill_payment_method,
                    'is_debit' => false,
                    'invoice_number' => $bill->invoice_number,
                    'transaction_note' => $request->bill_transaction_note,
                    'chart_of_account_id' => $accounts_payable_chart_of_account->id,
                    'bank_account_id' => $request->bill_bank_account_id,
                    'bill_id' => $bill->id,
                ];

                $bill_debit_transaction = [
                    'amount' => $bill->bill_paid_amount,
                    'current_amount' => $request->bill_paid_amount,
                    'transaction_type' => 'bill',
                    'transaction_date' => Now(),
                    'payment_method' => $request->bill_payment_method,
                    'is_debit' => true,
                    'invoice_number' => $bill->invoice_number,
                    'transaction_note' => $request->bill_transaction_note,
                    'chart_of_account_id' => $bill->chart_of_account_id,
                    'bank_account_id' => $request->bill_bank_account_id,
                    'bill_id' => $bill->id,
                ];

                $debit = new Transactions();
                $debit->fill($bill_debit_transaction);
                $debit->save();

                $credit = new Transactions();
                $credit->fill($bill_credit_transaction);
                $credit->save();

                // // Insert a new transaction record
                // $transaction = new Transactions();
                // $transaction->amount = $request->bill_paid_amount;
                // $transaction->transaction_type = 'bill';
                // $transaction->transaction_date = now(); // or use $request->transaction_date if provided
                // $transaction->is_debit = true; // Assuming this is a debit transaction
                // $transaction->invoice_number = $bill->invoice_number;
                // $transaction->chart_of_account_id = $
            });
            return response()->json([
                'success' => true,
                'message' => 'Bill updated successfully',
                'result' => InvoiceResource::make($bill)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function addInvoiceDiscount(Request $request, $invoiceId) {
        try {
            $invoice = Invoice::findOrFail($invoiceId);

            if (!$invoice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invoice not found!',
                ], 404);
            }

            DB::transaction(function () use ($request, $invoice) {
                $invoice->invoice_discounted_amount = $request->invoice_discounted_amount;

                $invoice->invoice_due_balance = $invoice->invoice_receivable_amount_bdt - $invoice->invoice_received_amount - $invoice->invoice_discounted_amount;

                $invoice->invoice_receivable_amount_bdt = $invoice->invoice_receivable_amount_bdt - $invoice->invoice_discounted_amount;

                $invoice->save();

                $lastDebitTransaction = Transactions::where('invoice_id', $invoice->id)->where('is_debit', true)->latest()->first();

                $lastDebitTransaction->amount = $invoice->invoice_due_balance;
                $lastDebitTransaction->transaction_note = $request->transaction_note ?? 'Discounted Amount';
                $lastDebitTransaction->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Discount added successfully',
                'result' => InvoiceResource::make($invoice)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function addBillDiscount(Request $request, $billId) {
        try {
            $bill = Bill::findOrFail($billId);

            if (!$bill) {
                return response()->json([
                    'success' => false,
                    'message' => 'Bill not found!',
                ], 404);
            }

            DB::transaction(function () use ($request, $bill) {
                $bill->bill_discounted_amount = $request->bill_discounted_amount;

                $bill->bill_due_balance = $bill->bill_payable_bdt - $bill->bill_paid_amount - $bill->bill_discounted_amount;
                $bill->bill_payable_bdt = $bill->bill_payable_bdt - $bill->bill_discounted_amount;

                $bill->save();

                $lastCreditTransaction = Transactions::where('bill_id', $bill->id)->where('is_debit', false)->latest()->first();

                $lastCreditTransaction->amount = $bill->bill_due_balance;
                $lastCreditTransaction->transaction_note = $request->transaction_note ?? 'Discounted Amount';
                $lastCreditTransaction->save();
            });

            return response()->json([
                'success' => true,
                'message' => 'Discount added successfully',
                'result' => InvoiceResource::make($bill)
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
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
        $query = Bill::query();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('destination', 'LIKE', '%' . $search . '%')
                    ->orWhere('master_air_way_bill', 'LIKE', '%' . $search . '%');
            });
        }
        $query->orderBy('created_at', 'desc');
        
        return response()->json([
            'success' => true,
            'message' => 'Bills retrieved successfully',
            'result' => $query->paginate(10)
        ], 200);
    }

    public function getBillByVendor($id, Request $request)
    {
        // get all paginated with search bills by vendor id
        $query = Bill::query();
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'LIKE', '%' . $search . '%')
                    ->orWhere('destination', 'LIKE', '%' . $search . '%')
                    ->orWhere('master_air_way_bill', 'LIKE', '%' . $search . '%');
            });
        }
        $query->where('vendor_id', $id);
        return response()->json([
            'success' => true,
            'message' => 'Bills retrieved successfully',
            'result' => $query->paginate(10)
        ], 200);

        // return response()->json([
        //     'success' => true,
        //     'message' => 'Bill retrieved successfully',
        //     'result' => InvoiceResource::collection(Bill::where('vendor_id', $id)->get())
        // ], 200);
    }

    public function searchBill($invoice_number)
    {
        $bill = Bill::with('transactions')
            ->where('invoice_number', 'like', '%' . $invoice_number . '%')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::collection($bill)
        ], 200);
    }

    public function getBillByBillId($id)
    {
        $bill = Bill::with(['transactions.bank_account', 'vendor'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'Bill retrieved successfully',
            'result' => InvoiceResource::make($bill)
        ], 200);
    }
}

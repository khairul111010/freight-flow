<?php

namespace App\Http\Controllers;

use App\Http\Resources\InvoiceResource;
use App\Models\Invoice;
use Exception;
use Illuminate\Http\Request;

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
            $invoice = new Invoice();
            $invoice->invoice_number = $request->invoice_number;
            $invoice->invoice_issue_date = $request->invoice_issue_date;
            $invoice->due_date = $request->due_date;
            $invoice->destination = $request->destination;
            $invoice->cartoon_amount = $request->cartoon_amount;
            $invoice->vat = $request->vat;
            $invoice->exchange = $request->exchange;
            $invoice->paid_amount = $request->paid_amount;
            $invoice->due_balance = $request->due_balance;
            $invoice->notes = $request->notes;
            $invoice->currency = $request->currency;
            $invoice->total_amount = $request->total_amount;
            $invoice->isPaid = $request->isPaid;
            $invoice->customer_id = $request->customer_id;
            $invoice->save();

            return response()->json([
                'success' => true,
                'message' => 'Invoice created successfully',
                'result' => InvoiceResource::make($invoice)
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

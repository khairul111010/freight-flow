<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Invoice;
use Illuminate\Http\Request;

class ProfitAndLossController extends Controller
{

    public function index(Request $request)
    {
        $invoices = Invoice::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('customer')->orderBy('created_at', 'desc')->get();
        $bills = Bill::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('vendor')->orderBy('created_at', 'desc')->get();

        $pnl = [];

        foreach ($invoices as $invoice) {
            foreach ($bills as $bill) {
                if ($invoice->invoice_number == $bill->invoice_number) {
                    array_push($pnl, [
                        'invoice_number' => $invoice->invoice_number,
                        'issue_date' => $invoice->issue_date,
                        'master_air_way_bill' => $invoice->master_air_way_bill,
                        'destination' => $invoice->destination,
                        'cartoon_amount' => $invoice->cartoon_amount,
                        'gross_weight' => $invoice->gross_weight,
                        'chargeable_weight' => $invoice->chargeable_weight,
                        'invoice_rate' => $invoice->invoice_rate,
                        'bill_rate' => $bill->bill_rate,
                        'customer' => $invoice->customer->name,
                        'vendor' => $bill->vendor->name,
                        'invoice_total_usd' => $invoice->invoice_total_usd,
                        'bill_total_usd' => $bill->bill_total_usd,
                        'exchange_rate' => $invoice->exchange_rate,
                        'invoice_receivable_amount_bdt' => $invoice->invoice_receivable_amount_bdt,
                        'bill_payable_bdt' => $bill->bill_payable_bdt,
                        'profit' => $invoice->invoice_receivable_amount_bdt - $bill->bill_payable_bdt
                    ]);
                }
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Profit and Loss retrieved successfully',
            'result' => $pnl
        ]);
    }
}

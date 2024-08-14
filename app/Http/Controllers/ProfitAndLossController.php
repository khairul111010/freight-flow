<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Invoice;
use Illuminate\Http\Request;

class ProfitAndLossController extends Controller
{

    public function index(Request $request) {
        $invoices = Invoice::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('customer')->get();
        
        $bills = Bill::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('vendor')->get();
        
        $pnl = [];

        foreach ($invoices as $invoice) {
            foreach ($bills as $bill) {
                if ($invoice->invoice_number == $bill->invoice_number) {
                    array_push($pnl, [
                        'invoice_number' => $invoice->invoice_number,
                        'invoice_issue_date' => $invoice->invoice_issue_date,
                        'master_air_way_bill' => $invoice->master_air_way_bill,
                        'destination' => $invoice->destination,
                        'cartoon_amount' => $invoice->cartoon_amount,
                        'chargeable_weight' => $invoice->chargeable_weight,
                        'gross_weight' => $invoice->gross_weight,
                        'customer' => $invoice->customer->name,
                        'invoice_total_usd' => $invoice->invoice_total_usd,
                        'invoice_exchange_rate' => $invoice->invoice_exchange_rate,
                        'invoice_rate' => $invoice->invoice_rate,
                        'invoice_received_amount' => $invoice->invoice_received_amount,
                        'vendor' => $bill->vendor->name,
                        'bill_rate' => $bill->bill_rate,
                        'bill_total_usd' => $bill->bill_total_usd,
                        'bill_exchange_rate' => $bill->bill_exchange_rate,
                        'bill_paid_amount' => $bill->bill_paid_amount,
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

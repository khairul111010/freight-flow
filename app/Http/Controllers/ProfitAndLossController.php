<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\Invoice;
use Illuminate\Http\Request;

class ProfitAndLossController extends Controller
{

    public function index(Request $request) {
        $invoices = Invoice::whereBetween('created_at', [$request->start_date, $request->end_date])->get();
        $bills = Bill::whereBetween('created_at', [$request->start_date, $request->end_date])->get();

        // Get invoice only from month and year of the date from the request also make nested relationship with customer from invoice
        $invoices = Invoice::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('customer')->get();

        // Get invoice only from month and year of the date from the request
        $bills = Bill::whereMonth('created_at', $request->month)->whereYear('created_at', $request->year)->with('vendor')->get();
        
        $profit = 0;
        foreach ($invoices as $invoice) {
            foreach ($bills as $bill) {
                if ($invoice->invoice_number == $bill->invoice_number) {
                    $profit += $invoice->amount - $bill->amount;
                }
            }
        }

        return response()->json([
            'profit' => $profit
        ]);


        

    }

}

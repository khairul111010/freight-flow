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
        
        $profit = 0;
        $loss = 0;
        foreach ($invoices as $invoice) {
            foreach ($bills as $bill) {
                if ($invoice->invoice_number == $bill->invoice_number) {
                    $profit += $invoice->amount - $bill->amount;
                }
            }
        }

        return response()->json([
            'profit' => $profit,
            'loss' => $loss
        ]);


        

    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'transaction_type',
        'transaction_date',
        'is_debit',
        'record_payment',
        'invoice_number',
        'chart_of_account_id',
        'bill_id',
        'invoice_id',
        'expense_id',
        'manual_journal_id',
    ];

    public function chartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class);
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function manualJournal()
    {
        return $this->belongsTo(ManualJournal::class);
    }
}

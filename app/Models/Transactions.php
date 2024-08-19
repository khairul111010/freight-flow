<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transactions extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'current_amount',
        'transaction_type',
        'transaction_date',
        'is_debit',
        'invoice_number',
        'payment_method',
        'transaction_note',
        'bank_account_id',
        'chart_of_account_id',
        'bill_id',
        'invoice_id',
        'expense_id',
        'manual_journal_id',
    ];

    public function chartOfAccount()
    {
        return $this->belongsTo(ChartOfAccount::class, 'chart_of_account_id');
    }

    public function bank_account()
    {
        return $this->belongsTo(BankAccounts::class, 'bank_account_id');
    }

    public function bill()
    {
        return $this->belongsTo(Bill::class, 'bill_id');
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class, 'invoice_id');
    }

    public function expense()
    {
        return $this->belongsTo(Expense::class, 'expense_id');
    }

    public function manualJournal()
    {
        return $this->belongsTo(ManualJournal::class, 'manual_journal_id');
    }
}

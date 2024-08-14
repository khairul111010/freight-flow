<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    // public function invoiceCharges() {
    //     return $this->hasMany(Charge::class, 'invoice_charge_id');
    // }

    // public function billCharges() {
    //     return $this->hasMany(Charge::class, 'bill_charge_id');
    // }

    public function chart_of_account()
    {
        return $this->belongsTo(ChartOfAccount::class, 'chart_of_account_id');
    }


    public function transactions()
    {
        return $this->hasMany(Transactions::class, 'invoice_id');
    }
}

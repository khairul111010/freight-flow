<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bill extends Model
{
    use HasFactory;

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    // public function charges()
    // {
    //     return $this->hasMany(Charge::class);
    // }

    public function chart_of_account()
    {
        return $this->belongsTo(ChartOfAccount::class, 'chart_of_account_id');
    }

    public function bank_account()
    {
        return $this->belongsTo(BankAccounts::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transactions::class, 'bill_id');
    }
}

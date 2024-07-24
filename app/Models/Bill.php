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

    public function bank_account() {
        return $this->belongsTo(Bank_Account::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transactions::class);
    }
}

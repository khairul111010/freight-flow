<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartOfAccountTypes extends Model
{
    use HasFactory;

    public function chartOfAccounts()
    {
        return $this->hasMany(ChartOfAccount::class);
    }
}

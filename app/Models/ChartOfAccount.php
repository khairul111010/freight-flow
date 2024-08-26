<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartOfAccount extends Model
{
    use HasFactory;

    public function tags()
    {
        return $this->belongsToMany(Tags::class, 'chart_of_account_tags', 'chart_of_account_id', 'tag_id');
    }

    public function chartOfAccountTypes()
    {
        return $this->belongsTo(ChartOfAccountTypes::class, 'chart_of_account_type_id');
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'chart_of_account_id');
    }

    public function bills()
    {
        return $this->hasMany(Bill::class, 'chart_of_account_id');
    }

    public function expense()
    {
        return $this->hasMany(Expense::class, 'chart_of_account_id');
    }

    public function transactions()
    {
        return $this->hasMany(Transactions::class, 'chart_of_account_id');
    }
}

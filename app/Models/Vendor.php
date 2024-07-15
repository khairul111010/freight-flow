<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    public function bills()
    {
        return $this->hasMany(Bill::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}

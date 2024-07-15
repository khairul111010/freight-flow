<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChartOfAccountTag extends Model
{
    use HasFactory;

    public function tags()
    {
        return $this->belongsTo(Tags::class, 'tag_id');
    }

    public function chartOfAccounts()
    {
        return $this->belongsTo(ChartOfAccount::class, 'chart_of_account_id');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tags extends Model
{
    use HasFactory;

    // public function chartOfAccounts() : HasMany
    // {
    //     return $this->hasMany(ChartOfAccount::class);
    // }

    public function chartOfAccountTags() : HasMany
    {
        return $this->hasMany(ChartOfAccountTag::class);
    }
}

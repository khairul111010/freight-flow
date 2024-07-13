<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chart_of_account_default_tags = [
            'RECEIVABLE' => 'receivable',
            'PAYABLE' => 'payable',
            'CURRENT_ASSET' => 'current-asset',
            'NON_CURRENT_ASSET' => 'non-current-asset',
            'OPERATING_EXPENSE' => 'operating-expense',
            'CURRENT_LIABILITY' => 'current-liability',
            'NON_CURRENT_LIABILITY' => 'non-current-liability',
            'OWNERS_EQUITY' => 'owners-equity',
            'INCOME' => 'income',
            'REVENUE' => 'revenue',
            'CASH' => 'cash',
            'BANK' => 'bank'
        ];

        foreach ($chart_of_account_default_tags as $key => $value) {
            \App\Models\Tags::create([
                'name' => $value
            ]);
        }
    }
}

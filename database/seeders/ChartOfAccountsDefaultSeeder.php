<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChartOfAccountsDefaultSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chartOfAccountTypeId = DB::table('chart_of_account_types')->first()->id; // Ensure this exists.
        
        $accounts = [
            [
                'name' => 'Sample Account 1',
                'code' => '001',
                'slug' => Str::slug('Sample Account 1'),
                'description' => 'This is a sample chart of account 1',
                'is_default' => true,
                'chart_of_account_type_id' => $chartOfAccountTypeId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sample Account 2',
                'code' => '002',
                'slug' => Str::slug('Sample Account 2'),
                'description' => 'This is a sample chart of account 2',
                'is_default' => false,
                'chart_of_account_type_id' => $chartOfAccountTypeId,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more accounts as needed
        ];

        DB::table('chart_of_accounts')->insert($accounts);
    }
}

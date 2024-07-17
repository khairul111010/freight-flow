<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class OrganizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Organization::create([
            'name' => 'SONIKA',
            'description' => 'SONIKA BD SHIPPERS LTD',
            'address' => 'Uttara, Dhaka',
            'currency' => 'BDT',
        ]);

        // DB::table('Organization')->insert([
        //     'name' => 'SONIKA',
        //     'description' => 'SONIKA BD SHIPPERS LTD',
        //     'address' => 'Uttara, Dhaka',
        //     'currency' => 'BDT',
        // ]);
    }
}

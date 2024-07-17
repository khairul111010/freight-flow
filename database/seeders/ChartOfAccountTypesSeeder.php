<?php

namespace Database\Seeders;

use App\Models\ChartOfAccountTypes;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ChartOfAccountTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $chart_of_account_types = [
            'asset' => [
                'Advance Tax',
                'Cash and cash equivalent',
                'Accounts Receivable',
                'Advance Deposits and Prepayments',
                'Allowance for Doubtful Accounts',
                'Interest Receivable',
                'Inventory',
                'Office Supplies',
                'Cleaning and Washing',
                'Property Plant and Equipment',
                'Prepaid Insurance',
                'Prepaid Rent',
                'Prepaid Expense',
                'Land',
                'Equipment',
                'Accumulated Depreciation Equipment',
                'Buildings',
                'Accumulated Depreciation Buildings',
                'Intangible Asset',
                'Trade Receivable',
                'Bank',
                'Fixed Asset',
                'Stock',
                'Other Asset', // FOR ZOHO
                'Other Current Asset', // FOR ZOHO
                'Cash', // FOR ZOHO,
                'Payment Clearing' // FOR ZOHO
            ],
            'liability' => [
                'Allowance for Doubtful Debt',
                'Bank Overdraft',
                'Loan',
                'Accounts Payable',
                'Unearned Service Revenue',
                'Salaries and Wages Payable',
                'Unearned Rent Revenue',
                'Interest Payable',
                'Dividends Payable',
                'Income Tax Payable',
                'Bonds Payable',
                'Discount on Bonds Payable',
                'Premium on Bonds Payable',
                'Mortgage Payable',
                'Opening Balance Adjustments',
                'Credit Card',
                'Other Liability',
                'Other Current Liability', // FOR ZOHO,
                'Long Term Liability' // FOR ZOHO
            ],
            'owners-equity' => [
                'Equity',
                'Owners Capital',
                'Owners Drawings',
                'Share Premium',
                'Treasury Stock',
                'Retained Earnings',
                'Dividends',
                'Income Summary'
            ],
            'income' => [
                'Income',
                'Interest Income',
                'Other Income',
                'Service Revenue',
                'Sales Revenue',
                'Sales Discounts',
                'Sales Returns and Allowances',
                'Interest Revenue',
                'Gain on Disposal of Plant Assets'
            ],
            'expense' => [
                'Cash Discounts',
                'Expense',
                'Finance Cost',
                'Office Supplies Expense',
                'Amortization Expense',
                'Bad Debt Expense',
                'Cost of Goods Sold',
                'Depreciation Expense',
                'Exchange Gain or Loss',
                'Freight-Out',
                'Income Tax Expense',
                'Insurance Expense',
                'Interest Expense',
                'Loss on Disposal of Plant Assets',
                'Maintenance and Repairs Expense',
                'Rent Expense',
                'Salaries and Wages Expense',
                'Selling Expense',
                'Supplies Expense',
                'Utilities Expense',
                'Operating Expense',
                'Travel Expense',
                'Entertainment Expense',
                'Lodging',
                'Postage and Courier Expense',
                'Cleaning and Washing Expense',
                'Trade Show Expense',
                'Bank Charges Expense',
                'Advertising And Marketing Expense',
                'Salary and Wages Expense',
                'Office Rent Expense',
                'Professional Fee Expense',
                'Other Expense'
            ]
        ];

        foreach ($chart_of_account_types as $type => $accounts) {
            foreach ($accounts as $account) {
                ChartOfAccountTypes::create([
                    'name' => $account,
                    'type' => $type,
                    'category' => Str::slug($account, '-'),
                ]);
            }
        }
    }
}

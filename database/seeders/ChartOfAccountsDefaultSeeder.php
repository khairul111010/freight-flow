<?php

namespace Database\Seeders;

use App\Models\ChartOfAccount;
use App\Models\ChartOfAccountTag;
use App\Models\ChartOfAccountTypes;
use App\Models\Tags;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ChartOfAccountsDefaultSeeder extends Seeder
{
    
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        
        DB::transaction(function () {
        // Predefined data for ChartOfAccounts
        $defaultChartOfAccounts = [
            [
                'account-name'=> 'Cash on Hand',
                'description'=>
                    'Represents physical cash that a company has in its possession',
                'code'=> 1000,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Petty Cash',
                'description'=>
                    'Represents a small amount of cash that is kept on hand for minor expenses',
                'code'=> 1010,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Cash in Checking Account',
                'description'=>
                    'Represents cash held in a checking account, which is typically used for day-to-day transactions',
                'code'=> 1020,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Cash in Savings Account',
                'description'=>
                    'Represents cash held in a savings account, which is typically used for longer-term savings',
                'code'=> 1030,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Cash in Money Market Account',
                'description'=>
                    'Represents cash held in a money market account, which is similar to a savings account but offers higher interest rates',
                'code'=> 1040,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Cash in Foreign Currency Account',
                'description'=>
                    'Represents cash held in a foreign currency account, which is used for transactions in a foreign currency',
                'code'=> 1050,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Cash in Transit',
                'description'=>
                    'Represents cash that is in transit, such as cash being transported from one location to another',
                'code'=> 1060,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Cash Receipts',
                'description'=>
                    'This account is used to record all cash inflows into the company, such as cash sales, rent payments, and customer payments.',
                'code'=> 1070,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Cash Payments',
                'description'=>
                    'This account is used to record all cash outflows from the company, such as payments to suppliers, rent payments, and other expenses.',
                'code'=> 1080,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Cash Discounts',
                'description'=>
                    'This account is used to record any discounts given to customers for paying their invoices early.',
                'code'=> 1090,
                'account-type'=> 'Cash Discounts',
                'tags'=> [
                    'operating-expense',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Bank Interest Earned',
                'description'=>
                    'This account is used to record any interest earned on the companys bank account balances.',
                'code'=> 1110,
                'account-type'=> 'Interest income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Bank Interest Paid',
                'description'=>
                    'This account is used to record any interest paid on loans or other borrowings.',
                'code'=> 1120,
                'account-type'=> 'Finance Cost',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Bank Overdrafts',
                'description'=>
                    'This account is used to record any negative balance in the companys bank account(s), which means that the company has overdrawn from the account.',
                'code'=> 1130,
                'account-type'=> 'Bank Overdraft',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Bank Transfers',
                'description'=>
                    'This account is used to record any transfers made between the companys different bank accounts.',
                'code'=> 1140,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Bank Reconciliations',
                'description'=>
                    'This account is used to reconcile the companys bank statements with its accounting records, to ensure that all transactions have been accurately recorded.',
                'code'=> 1150,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ],
            [
                'account-name'=> 'Undeposited Funds',
                'description'=> '',
                'code'=> 1160,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'cash'
                ]
            ],
            [
                'account-name'=> 'Accounts Receivable',
                'description'=>
                    'This account is used to record all money owed to the company by its customers for goods or services provided on credit.',
                'code'=> null,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Trade Accounts Receivable',
                'description'=>
                    'Amounts owed to the business for goods or services sold on credit.',
                'code'=> 1200,
                'account-type'=> 'Trade Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Allowance for Doubtful Accounts',
                'description'=>
                    'A contra-asset account used to record estimated losses from customers who may not pay their outstanding debts.',
                'code'=> 1210,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Interest on Receivables',
                'description'=>
                    'Interest income earned on outstanding receivables from customers.',
                'code'=> 1240,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Other Receivables',
                'description'=>
                    'Amounts owed to the business for other types of transactions, such as deposits or prepayments.',
                'code'=> 1250,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Notes Receivable',
                'description'=>
                    'Amounts owed to the business from promissory notes issued by customers or other parties.',
                'code'=> 1260,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Due from Affiliates',
                'description'=>
                    'Amounts owed to the business from other entities within the same corporate family.',
                'code'=> 1270,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Due from Related Parties',
                'description'=>
                    'Amounts owed to the business from parties with a relationship to the business, such as owners or other affiliated companies.',
                'code'=> 1280,
                'account-type'=> 'Accounts Receivable',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Employee Advance',
                'description'=>
                    'Amounts owed to the business from employees for cash advances or other expenses.',
                'code'=> 1300,
                'account-type'=> 'Advance Deposits and Prepayments',
                'tags'=> [
                    'receivable',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Advance Tax',
                'description'=>
                    'Amounts owed to the business from tax authorities as advance payments or prepayments.',
                'code'=> null,
                'account-type'=> 'Advance Tax',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Credit Card Receivables',
                'description'=>
                    'This account represents the amount of money owed to a company by its customers who have purchased goods or services using credit cards.',
                'code'=> 1330,
                'account-type'=> 'Accounts Receivable',
                'tags'=> ['receivable']
            ],
            [
                'account-name'=> 'Provision for Doubtful Accounts',
                'description'=>
                    'This is a contra-asset account that represents the estimated amount of accounts receivable that a company expects to be uncollectible.',
                'code'=> 1211,
                'account-type'=> 'Allowance for Doubtful Debt',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Reserve for Uncollectible Accounts',
                'description'=>
                    'This account is similar to the provision for doubtful accounts, and represents the estimated amount of accounts receivable that a company does not expect to be collected.',
                'code'=> 1212,
                'account-type'=> 'Allowance for Doubtful Debt',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Allowance for Bad Debts',
                'description'=>
                    'This is another name for the provision for doubtful accounts or reserve for uncollectible accounts.',
                'code'=> 1213,
                'account-type'=> 'Allowance for Doubtful Debt',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Reserve for Doubtful Accounts',
                'description'=>
                    'This account is similar to the provision for doubtful accounts and allowance for bad debts, and represents the estimated amount of accounts receivable that a company does not expect to be collected.',
                'code'=> 1214,
                'account-type'=> 'Allowance for Doubtful Debt',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Mortgage Interest Receivable',
                'description'=>
                    'This account represents the interest earned on a mortgage loan that has not yet been received.',
                'code'=> 1290,
                'account-type'=> 'Interest Receivable',
                'tags'=> ['receivable']
            ],
            [
                'account-name'=> 'Credit Card Interest Receivable',
                'description'=>
                    'This account represents the interest earned on credit card balances that have not yet been paid by customers.',
                'code'=> 1310,
                'account-type'=> 'Interest Receivable',
                'tags'=> ['receivable']
            ],
            [
                'account-name'=> 'Other Interest Receivable',
                'description'=>
                    'This account represents the interest earned on other types of loans or investments that have not yet been received.',
                'code'=> 1320,
                'account-type'=> 'Interest Receivable',
                'tags'=> ['receivable']
            ],
            [
                'account-name'=> 'Raw materials inventory',
                'description'=>
                    'This account represents the value of raw materials that a company has on hand and intends to use in the production of its products.',
                'code'=> 1400,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Work-in-progress inventory',
                'description'=>
                    'This account represents the value of products that are in the process of being manufactured or assembled.',
                'code'=> 1410,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Finished goods inventory',
                'description'=>
                    'This account represents the value of completed products that are ready to be sold to customers.',
                'code'=> 1420,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=>
                    'Maintenance, repair, and operating supplies (MRO) inventory',
                'description'=>
                    'This account represents the value of supplies and materials that a company uses to maintain and repair its equipment and facilities.',
                'code'=> 1430,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Consignment inventory',
                'description'=>
                    'This account represents products that a company has sent to another company or retailer to be sold on consignment.',
                'code'=> 1440,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Safety stock inventory',
                'description'=>
                    'This account represents the extra inventory that a company keeps on hand to ensure that it does not run out of products due to unexpected demand or supply chain disruptions.',
                'code'=> 1450,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Dead stock inventory',
                'description'=>
                    'This account represents inventory that a company has been unable to sell and is unlikely to sell in the future.',
                'code'=> 1460,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Inventory Asset',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Inventory',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Office supplies',
                'description'=>
                    'This account represents the value of supplies and materials that a company uses in its day-to-day operations, such as paper, pens, and other office supplies.',
                'code'=> 1500,
                'account-type'=> 'Office Supplies Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Cleaning supplies',
                'description'=>
                    'This account represents the value of supplies and materials that a company uses to clean and maintain its facilities.',
                'code'=> 1510,
                'account-type'=> 'Cleaning and Washing Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Safety supplies',
                'description'=> '',
                'code'=> 1540,
                'account-type'=> 'Office Supplies Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Other supplies',
                'description'=> '',
                'code'=> 1550,
                'account-type'=> 'Office Supplies',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Prepaid insurance',
                'description'=>
                    'An asset account that represents the amount paid in advance for insurance coverage that will expire in the current or future periods.',
                'code'=> null,
                'account-type'=> 'Advance Deposits and Prepayments',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Prepaid rent',
                'description'=>
                    'An asset account that represents the amount paid in advance for rent on a property that will expire in the current or future periods.',
                'code'=> null,
                'account-type'=> 'Advance Deposits and Prepayments',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Prepaid Expenses',
                'description'=>
                    'An asset account that represents the payment made in advance for goods or services that will be consumed in the future.',
                'code'=> null,
                'account-type'=> 'Advance Deposits and Prepayments',
                'tags'=> ['current-asset']
            ],
            [
                'account-name'=> 'Land',
                'description'=>
                    'An asset account that represents the cost of land owned by the business.',
                'code'=> 1600,
                'account-type'=> 'Property Plant and Equipment',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Furniture and Equipment',
                'description'=>
                    'An asset account that represents the cost of equipment used in the operation of the business.',
                'code'=> 1700,
                'account-type'=> 'Property Plant and Equipment',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Accumulated Depreciation - Equipment',
                'description'=>
                    'A contra-asset account that represents the total amount of depreciation taken on equipment since it was acquired.',
                'code'=> 1800,
                'account-type'=> 'Accumulated Depreciation Equipment'
            ],
            [
                'account-name'=> 'Buildings',
                'description'=>
                    'An asset account that represents the cost of buildings owned by the business.',
                'code'=> null,
                'account-type'=> 'Property Plant and Equipment',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Accumulated Depreciation - Buildings',
                'description'=>
                    'Buildings=> A contra-asset account that represents the total amount of depreciation taken on buildings since they were acquired.',
                'code'=> 1670,
                'account-type'=> 'Accumulated Depreciation Buildings'
            ],
            [
                'account-name'=> 'Copyrights',
                'description'=>
                    'An asset account that represents the exclusive right to reproduce and sell an original work of authorship.',
                'code'=> 1810,
                'account-type'=> 'Intangible Asset',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Goodwill',
                'description'=>
                    'An asset account that represents the excess of the purchase price of a business over the fair market value of its net assets.',
                'code'=> null,
                'account-type'=> 'Intangible Asset',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Patents',
                'description'=>
                    'An asset account that represents the exclusive right to manufacture, use, or sell a particular invention or process.',
                'code'=> null,
                'account-type'=> 'Intangible Asset',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Notes Payable',
                'description'=>
                    'A liability account that represents the amount owed by the business for money borrowed through a written promissory note.',
                'code'=> 2010,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Notes Payable to Banks',
                'description'=>
                    'A liability account that represents the amount owed by the business for money borrowed from banks through a written promissory note.',
                'code'=> 2110,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Notes Payable to Related Parties',
                'description'=>
                    'A liability account that represents the amount owed by the business for money borrowed from related parties through a written promissory note.',
                'code'=> 2120,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Notes Payable Secured by Assets',
                'description'=>
                    'A liability account that represents the amount owed by the business for money borrowed through a written promissory note secured by the business assets.',
                'code'=> 2130,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Notes Payable Unsecured',
                'description'=>
                    'A liability account that represents the amount owed by the business for money borrowed through a written promissory note that is not secured by the business assets.',
                'code'=> 2140,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Discount on Notes Payable',
                'description'=>
                    'A contra-liability account that represents the difference between the face value of a note payable and the amount received by the business as proceeds.',
                'code'=> 2150,
                'account-type'=> 'Loan',
                'tags'=> [
                    'payable',
                    'non-current-liability'
                ]
            ],
            [
                'account-name'=> 'Interest Payable on Notes Payable',
                'description'=>
                    'A liability account that represents the amount of interest owed by the business on outstanding notes payable.',
                'code'=> 2160,
                'account-type'=> 'Accounts Payable',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Accounts Payable',
                'description'=>
                    'A liability account that represents the amount owed by the business to suppliers for goods and services purchased on credit.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Dimension Adjustments',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Other Liability',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Trade Payables',
                'description'=>
                    ' A category of accounts payable that includes amounts owed to suppliers for inventory and supplies purchased on credit.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Accrued Expenses Payable',
                'description'=>
                    'A liability account that represents the amount of expenses that have been incurred by the business but have not yet been paid.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Salaries and Wages Payable',
                'description'=>
                    ' A liability account that represents the amount of salaries and wages owed by the business to its employees.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Interest Payable',
                'description'=>
                    ' A liability account that represents the amount of interest owed by the business on outstanding loans and other credit facilities.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Rent Payable',
                'description'=>
                    'A liability account that represents the amount of rent owed by the business for the use of leased property.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Tax Payable',
                'description'=>
                    'A liability account that represents the amount of taxes owed by the business to the government.',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Utilities Payable',
                'description'=>
                    'A liability account that represents the amount of utility bills owed by the business',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Warranty Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Other Payables',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Accounts Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Unearned Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Subscription Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Membership Dues',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Consulting Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Legal Fees Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Accounting Fees Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Advertising Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Software License Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Maintenance Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Service Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Unearned Rent Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Unearned Rent Revenue',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Dividends Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Dividends Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Income Tax Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Income Tax Payable',
                'tags'=> [
                    'payable',
                    'current-liability'
                ]
            ],
            [
                'account-name'=> 'Bonds Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Bonds Payable',
                'tags'=> [
                    'payable',
                    'non-current-liability'
                ]
            ],
            [
                'account-name'=> 'Discount on Bonds Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Discount on Bonds Payable',
                'tags'=> ['payable']
            ],
            [
                'account-name'=> 'Premium on Bonds Payable',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Premium on Bonds Payable',
                'tags'=> ['payable']
            ],
            [
                'account-name'=> 'Mortgage Payable',
                'description'=> 'Amount owed for a mortgage loan',
                'code'=> null,
                'account-type'=> 'Mortgage Payable',
                'tags'=> [
                    'payable',
                    'non-current-liability'
                ]
            ],
            [
                'account-name'=> 'Employee Reimbursements',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Other Liability',
                'tags'=> ['current-liability']
            ],
            [
                'account-name'=> 'Opening Balance Adjustments',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Opening Balance Adjustments',
                'tags'=> [
                    'current-liability',
                    'current-asset'
                ]
            ],
            [
                'account-name'=> 'Owners Equity',
                'description'=> '',
                'code'=> 3000,
                'account-type'=> 'Equity',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Opening Balance Offset',
                'description'=> '',
                'code'=> 3000,
                'account-type'=> 'Equity',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Owners Capital',
                'description'=> '',
                'code'=> 3000,
                'account-type'=> 'Owners Capital',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Drawings',
                'description'=> '',
                'code'=> 3000,
                'account-type'=> 'Owners Drawings',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Paid-in Capital in Excess of Par Preferred Stock',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Share Premium',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Treasury Stock',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Treasury Stock',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Retained Earnings',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Retained Earnings',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'Dividends Paid',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Dividends',
                'tags'=> ['owners-equity']
            ],
            [
                'account-name'=> 'General Income',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Interest Income',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Late Fee Income',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Other Charges',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Service Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Service Revenue',
                'tags'=> [
                    'income',
                    'revenue'
                ]
            ],
            [
                'account-name'=> 'Sales',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Sales Revenue',
                'tags'=> [
                    'income',
                    'revenue'
                ]
            ],
            [
                'account-name'=> 'Sales Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Sales Revenue',
                'tags'=> [
                    'income',
                    'revenue'
                ]
            ],
            [
                'account-name'=> 'Discount',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Sales Discounts'
            ],
            [
                'account-name'=> 'Sales Returns and Allowances',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Sales Returns and Allowances',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Interest Revenue',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Interest Income',
                'tags'=> ['income']
            ],
            [
                'account-name'=> 'Office Supplies Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Office Supplies Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Depreciation Expense - Administrative',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Depreciation Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Professional Fees Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Professional Fee Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Amortization Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Amortization Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Bad Debt',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Bad Debt Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Cost of Goods Sold',
                'description'=>
                    'The direct costs incurred in producing goods sold by a company.',
                'code'=> null,
                'account-type'=> 'Cost of Goods Sold',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Depreciation Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Depreciation Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Freight-Out',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Freight-Out',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Income Tax Expense',
                'description'=>
                    'The amount of income tax that a company is obligated to pay based on its taxable income.',
                'code'=> null,
                'account-type'=> 'Income Tax Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Insurance Expense',
                'description'=>
                    'The cost of insurance policies for the protection of the business against various risks',
                'code'=> null,
                'account-type'=> 'Insurance Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Interest Expense',
                'description'=>
                    'The cost of borrowing money, typically associated with loans, bonds, or other debt instruments.',
                'code'=> null,
                'account-type'=> 'Interest Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Loss on Disposal of Plant Assets',
                'description'=>
                    'The amount of loss incurred by a company when it sells or disposes of a plant asset for an amount less than its book value.',
                'code'=> null,
                'account-type'=> 'Loss on Disposal of Plant Assets',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Repairs and Maintenance',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Maintenance and Repairs Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Rent Expense',
                'description'=>
                    'The cost of renting office or business space for a period of time.',
                'code'=> null,
                'account-type'=> 'Office Rent Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Salaries and Employee Wages',
                'description'=>
                    'The total amount of money paid to employees during a specific period of time.',
                'code'=> null,
                'account-type'=> 'Salary and Wages Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Shipping Charge',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Selling Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Advertising And Marketing',
                'description'=>
                    'The cost of promoting a companys products or services through various media channels, such as print, radio, television, or digital advertising.',
                'code'=> null,
                'account-type'=> 'Advertising And Marketing Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Commissions Expense',
                'description'=>
                    'The amount paid to salespeople or agents for selling a companys products or services.',
                'code'=> null,
                'account-type'=> 'Selling Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Delivery Expense',
                'description'=>
                    'The cost of delivering products to customers, including transportation, labor, and packaging expenses.',
                'code'=> null,
                'account-type'=> 'Selling Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Automobile Expense',
                'description'=>
                    'The cost of delivering products to customers, including transportation, labor, and packaging expenses.',
                'code'=> null,
                'account-type'=> 'Selling Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Trade Show Expense',
                'description'=>
                    'The cost of participating in trade shows or exhibitions to promote a companys products or services to potential customers or partners.',
                'code'=> null,
                'account-type'=> 'Trade Show Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Supplies Expense',
                'description'=>
                    'The cost of supplies used in the day-to-day operations of a business, such as office supplies, cleaning supplies, or manufacturing supplies.',
                'code'=> null,
                'account-type'=> 'Supplies Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Utilities Expense',
                'description'=>
                    'The cost of utilities, such as electricity, gas, water, and internet, used by the company for its operations.',
                'code'=> null,
                'account-type'=> 'Utilities Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Consultant Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Professional Fee Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Credit Card Charges',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Operating Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'IT and Internet Expenses',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Operating Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Janitorial Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Cleaning and Washing Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Postage',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Postage and Courier Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Printing and Stationery',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Operating Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Telephone Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Operating Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Travel Expense',
                'description'=>
                    'The cost of travel, lodging, and meals incurred by salespeople and other employees while traveling for business purposes, including attending meetings, conferences, or other events related to sales or business development.',
                'code'=> null,
                'account-type'=> 'Travel Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Lodging',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Lodging',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Meals and Entertainment',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Entertainment Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Purchase Discounts',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Bank Fees and Charges',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Bank Charges Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Uncategorized',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Other Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Other Expense',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Other Expense',
                'tags'=> ['operating-expense']
            ],
            [
                'account-name'=> 'Exchange Gain or Loss',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Exchange Gain or Loss',
                'tags'=> [
                    'operating-expense',
                    'income'
                ]
            ],
            [
                'account-name'=> 'Long Term Loan From Bank',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Long Term Liability',
                'tags'=> ['non-current-asset']
            ],
            [
                'account-name'=> 'Cash at Bank',
                'description'=> '',
                'code'=> null,
                'account-type'=> 'Cash and cash equivalent',
                'tags'=> [
                    'current-asset',
                    'bank'
                ]
            ]
        ];

            foreach ($defaultChartOfAccounts as $values) {
                $chartOfAccountType = ChartOfAccountTypes::firstOrCreate([
                    'name' => $values['account-type']
                ]);
                if ($chartOfAccountType) {
                    $chartOfAccount = ChartOfAccount::create([
                        'name' => $values['account-name'],
                        'slug' => Str::slug($values['account-name'], '-'),
                        'code' => $values['code'] ? (string) $values['code'] : null,
                        'description' => $values['description'],
                        'is_default' => true,
                        'chart_of_account_type_id' => $chartOfAccountType->id
                    ]);

                    if (!empty($values['tags'])) {
                        foreach ($values['tags'] as $tag) {
                            // Assuming Tag model and relationship setup exists
                            $tagModel = Tags::firstOrCreate(['name' => $tag]);
                            // $chartOfAccount->tags()->attach($tagModel->id);
                            $chartOfAccountTag = new ChartOfAccountTag();
                            $chartOfAccountTag->chart_of_account_id = $chartOfAccount->id;
                            $chartOfAccountTag->tag_id = $tagModel->id;
                            $chartOfAccountTag->save();
                        }
                    }
                } else {
                    // Log or handle the case where account type is not found
                    echo "Account type not found: " . $values['account-type'] . PHP_EOL;
                }
            }
        });
    }
}

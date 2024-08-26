-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 01:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `freight-flow`
--

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'MIDLAND BANK', '2024-08-26 12:37:08', '2024-08-26 12:37:08'),
(2, 'STANDARD CHARTERED BANK', '2024-08-26 12:37:14', '2024-08-26 12:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `account_name` varchar(255) NOT NULL,
  `account_number` varchar(255) NOT NULL,
  `account_routing_number` varchar(255) NOT NULL,
  `branch` varchar(255) DEFAULT NULL,
  `opening_bank_balance` double NOT NULL DEFAULT 0,
  `bank_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `account_name`, `account_number`, `account_routing_number`, `branch`, `opening_bank_balance`, `bank_id`, `created_at`, `updated_at`) VALUES
(1, 'SONIKA PACKERS & SHIPPERS', '00061050009741', '00061050009750', 'UTTARA MODEL TOWN', 99700, 1, '2024-08-26 12:37:31', '2024-08-26 17:48:12'),
(2, 'NEO FREIGHT SERVICES', '035143000000074', '035143000000074', 'UTTARA MODEL TOWN', 48000, 2, '2024-08-26 12:37:55', '2024-08-26 12:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `issue_date` date NOT NULL,
  `bill_due_date` date NOT NULL,
  `destination` varchar(255) NOT NULL,
  `master_air_way_bill` varchar(255) DEFAULT NULL,
  `master_air_way_bill_fee` double DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `cartoon_amount` int(11) NOT NULL,
  `gross_weight` double DEFAULT NULL,
  `chargeable_weight` double DEFAULT NULL,
  `bill_rate` double DEFAULT NULL,
  `bill_freight_amount` double DEFAULT NULL,
  `thc` double DEFAULT NULL,
  `ssc` double DEFAULT NULL,
  `cd` double DEFAULT NULL,
  `cgc` double DEFAULT NULL,
  `dtc` double DEFAULT NULL,
  `ait` double DEFAULT NULL,
  `ams` double DEFAULT NULL,
  `itt` double DEFAULT NULL,
  `others` double DEFAULT NULL,
  `bill_vat` double DEFAULT NULL,
  `bill_total_usd` double DEFAULT NULL,
  `exchange_rate` double DEFAULT NULL,
  `bill_payable_bdt` double NOT NULL DEFAULT 0,
  `bill_paid_amount` double NOT NULL DEFAULT 0,
  `bill_due_balance` double NOT NULL DEFAULT 0,
  `bill_discounted_amount` double DEFAULT 0,
  `bill_note` text DEFAULT NULL,
  `vendor_id` bigint(20) UNSIGNED NOT NULL,
  `chart_of_account_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `invoice_number`, `issue_date`, `bill_due_date`, `destination`, `master_air_way_bill`, `master_air_way_bill_fee`, `unit`, `cartoon_amount`, `gross_weight`, `chargeable_weight`, `bill_rate`, `bill_freight_amount`, `thc`, `ssc`, `cd`, `cgc`, `dtc`, `ait`, `ams`, `itt`, `others`, `bill_vat`, `bill_total_usd`, `exchange_rate`, `bill_payable_bdt`, `bill_paid_amount`, `bill_due_balance`, `bill_discounted_amount`, `bill_note`, `vendor_id`, `chart_of_account_id`, `created_at`, `updated_at`) VALUES
(1, 'SBDL-1', '2024-08-04', '2024-08-10', 'DEL', '228-8882-6485', 230, 1, 42, 1996, 1996, 1.4, 2794.4, 23, 21, 13, 35, 45, 36, 88, 44, 1, 10, 3340.4, 110, 367444, 0, 367444, 0, 'TEST', 3, NULL, '2024-08-26 12:40:38', '2024-08-26 12:40:38'),
(2, 'SBDL-2', '2024-08-11', '2024-08-18', 'CHI', '444-9999-111', 45, 1, 13, 44, 44, 2.1, 92.4, 33, 12, 65, 48, 33, 123, 65, 78, 99, 0, 693.4, 130, 90142, 0, 90142, 0, 'TEST', 1, NULL, '2024-08-26 12:43:02', '2024-08-26 12:43:02'),
(3, 'SBDL-3', '2024-08-11', '2024-08-17', 'BAN', '111-222-3333', 20, 1, 32, 78, 78, 2, 156, 112, 332, 45, 65, 78, 98, 13, 4, 4, 0, 927, 110, 101970, 48000, 53970, 0, 'TEST', 1, 2, '2024-08-26 13:58:56', '2024-08-26 15:03:50');

-- --------------------------------------------------------

--
-- Table structure for table `charges`
--

CREATE TABLE `charges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `invoice_number` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chart_of_accounts`
--

CREATE TABLE `chart_of_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `is_default` varchar(255) NOT NULL DEFAULT '1',
  `chart_of_account_type_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chart_of_accounts`
--

INSERT INTO `chart_of_accounts` (`id`, `name`, `slug`, `code`, `description`, `is_default`, `chart_of_account_type_id`, `created_at`, `updated_at`) VALUES
(1, 'Cash on Hand', 'cash-on-hand', '1000', 'Represents physical cash that a company has in its possession', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(2, 'Petty Cash', 'petty-cash', '1010', 'Represents a small amount of cash that is kept on hand for minor expenses', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(3, 'Cash in Checking Account', 'cash-in-checking-account', '1020', 'Represents cash held in a checking account, which is typically used for day-to-day transactions', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(4, 'Cash in Savings Account', 'cash-in-savings-account', '1030', 'Represents cash held in a savings account, which is typically used for longer-term savings', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(5, 'Cash in Money Market Account', 'cash-in-money-market-account', '1040', 'Represents cash held in a money market account, which is similar to a savings account but offers higher interest rates', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(6, 'Cash in Foreign Currency Account', 'cash-in-foreign-currency-account', '1050', 'Represents cash held in a foreign currency account, which is used for transactions in a foreign currency', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(7, 'Cash in Transit', 'cash-in-transit', '1060', 'Represents cash that is in transit, such as cash being transported from one location to another', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(8, 'Cash Receipts', 'cash-receipts', '1070', 'This account is used to record all cash inflows into the company, such as cash sales, rent payments, and customer payments.', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(9, 'Cash Payments', 'cash-payments', '1080', 'This account is used to record all cash outflows from the company, such as payments to suppliers, rent payments, and other expenses.', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(10, 'Cash Discounts', 'cash-discounts', '1090', 'This account is used to record any discounts given to customers for paying their invoices early.', '1', 64, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(11, 'Bank Interest Earned', 'bank-interest-earned', '1110', 'This account is used to record any interest earned on the companys bank account balances.', '1', 56, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(12, 'Bank Interest Paid', 'bank-interest-paid', '1120', 'This account is used to record any interest paid on loans or other borrowings.', '1', 66, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(13, 'Bank Overdrafts', 'bank-overdrafts', '1130', 'This account is used to record any negative balance in the companys bank account(s), which means that the company has overdrawn from the account.', '1', 29, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(14, 'Bank Transfers', 'bank-transfers', '1140', 'This account is used to record any transfers made between the companys different bank accounts.', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(15, 'Bank Reconciliations', 'bank-reconciliations', '1150', 'This account is used to reconcile the companys bank statements with its accounting records, to ensure that all transactions have been accurately recorded.', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(16, 'Undeposited Funds', 'undeposited-funds', '1160', '', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(17, 'Accounts Receivable', 'accounts-receivable', NULL, 'This account is used to record all money owed to the company by its customers for goods or services provided on credit.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(18, 'Trade Accounts Receivable', 'trade-accounts-receivable', '1200', 'Amounts owed to the business for goods or services sold on credit.', '1', 20, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(19, 'Allowance for Doubtful Accounts', 'allowance-for-doubtful-accounts', '1210', 'A contra-asset account used to record estimated losses from customers who may not pay their outstanding debts.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(20, 'Interest on Receivables', 'interest-on-receivables', '1240', 'Interest income earned on outstanding receivables from customers.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(21, 'Other Receivables', 'other-receivables', '1250', 'Amounts owed to the business for other types of transactions, such as deposits or prepayments.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(22, 'Notes Receivable', 'notes-receivable', '1260', 'Amounts owed to the business from promissory notes issued by customers or other parties.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(23, 'Due from Affiliates', 'due-from-affiliates', '1270', 'Amounts owed to the business from other entities within the same corporate family.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(24, 'Due from Related Parties', 'due-from-related-parties', '1280', 'Amounts owed to the business from parties with a relationship to the business, such as owners or other affiliated companies.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(25, 'Employee Advance', 'employee-advance', '1300', 'Amounts owed to the business from employees for cash advances or other expenses.', '1', 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(26, 'Advance Tax', 'advance-tax', NULL, 'Amounts owed to the business from tax authorities as advance payments or prepayments.', '1', 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(27, 'Credit Card Receivables', 'credit-card-receivables', '1330', 'This account represents the amount of money owed to a company by its customers who have purchased goods or services using credit cards.', '1', 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(28, 'Provision for Doubtful Accounts', 'provision-for-doubtful-accounts', '1211', 'This is a contra-asset account that represents the estimated amount of accounts receivable that a company expects to be uncollectible.', '1', 28, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(29, 'Reserve for Uncollectible Accounts', 'reserve-for-uncollectible-accounts', '1212', 'This account is similar to the provision for doubtful accounts, and represents the estimated amount of accounts receivable that a company does not expect to be collected.', '1', 28, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(30, 'Allowance for Bad Debts', 'allowance-for-bad-debts', '1213', 'This is another name for the provision for doubtful accounts or reserve for uncollectible accounts.', '1', 28, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(31, 'Reserve for Doubtful Accounts', 'reserve-for-doubtful-accounts', '1214', 'This account is similar to the provision for doubtful accounts and allowance for bad debts, and represents the estimated amount of accounts receivable that a company does not expect to be collected.', '1', 28, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(32, 'Mortgage Interest Receivable', 'mortgage-interest-receivable', '1290', 'This account represents the interest earned on a mortgage loan that has not yet been received.', '1', 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(33, 'Credit Card Interest Receivable', 'credit-card-interest-receivable', '1310', 'This account represents the interest earned on credit card balances that have not yet been paid by customers.', '1', 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(34, 'Other Interest Receivable', 'other-interest-receivable', '1320', 'This account represents the interest earned on other types of loans or investments that have not yet been received.', '1', 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(35, 'Raw materials inventory', 'raw-materials-inventory', '1400', 'This account represents the value of raw materials that a company has on hand and intends to use in the production of its products.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(36, 'Work-in-progress inventory', 'work-in-progress-inventory', '1410', 'This account represents the value of products that are in the process of being manufactured or assembled.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(37, 'Finished goods inventory', 'finished-goods-inventory', '1420', 'This account represents the value of completed products that are ready to be sold to customers.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(38, 'Maintenance, repair, and operating supplies (MRO) inventory', 'maintenance-repair-and-operating-supplies-mro-inventory', '1430', 'This account represents the value of supplies and materials that a company uses to maintain and repair its equipment and facilities.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(39, 'Consignment inventory', 'consignment-inventory', '1440', 'This account represents products that a company has sent to another company or retailer to be sold on consignment.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(40, 'Safety stock inventory', 'safety-stock-inventory', '1450', 'This account represents the extra inventory that a company keeps on hand to ensure that it does not run out of products due to unexpected demand or supply chain disruptions.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(41, 'Dead stock inventory', 'dead-stock-inventory', '1460', 'This account represents inventory that a company has been unable to sell and is unlikely to sell in the future.', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(42, 'Inventory Asset', 'inventory-asset', NULL, '', '1', 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(43, 'Office supplies', 'office-supplies', '1500', 'This account represents the value of supplies and materials that a company uses in its day-to-day operations, such as paper, pens, and other office supplies.', '1', 67, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(44, 'Cleaning supplies', 'cleaning-supplies', '1510', 'This account represents the value of supplies and materials that a company uses to clean and maintain its facilities.', '1', 89, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(45, 'Safety supplies', 'safety-supplies', '1540', '', '1', 67, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(46, 'Other supplies', 'other-supplies', '1550', '', '1', 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(47, 'Prepaid insurance', 'prepaid-insurance', NULL, 'An asset account that represents the amount paid in advance for insurance coverage that will expire in the current or future periods.', '1', 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(48, 'Prepaid rent', 'prepaid-rent', NULL, 'An asset account that represents the amount paid in advance for rent on a property that will expire in the current or future periods.', '1', 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(49, 'Prepaid Expenses', 'prepaid-expenses', NULL, 'An asset account that represents the payment made in advance for goods or services that will be consumed in the future.', '1', 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(50, 'Land', 'land', '1600', 'An asset account that represents the cost of land owned by the business.', '1', 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(51, 'Furniture and Equipment', 'furniture-and-equipment', '1700', 'An asset account that represents the cost of equipment used in the operation of the business.', '1', 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(52, 'Accumulated Depreciation - Equipment', 'accumulated-depreciation-equipment', '1800', 'A contra-asset account that represents the total amount of depreciation taken on equipment since it was acquired.', '1', 16, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(53, 'Buildings', 'buildings', NULL, 'An asset account that represents the cost of buildings owned by the business.', '1', 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(54, 'Accumulated Depreciation - Buildings', 'accumulated-depreciation-buildings', '1670', 'Buildings=> A contra-asset account that represents the total amount of depreciation taken on buildings since they were acquired.', '1', 18, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(55, 'Copyrights', 'copyrights', '1810', 'An asset account that represents the exclusive right to reproduce and sell an original work of authorship.', '1', 19, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(56, 'Goodwill', 'goodwill', NULL, 'An asset account that represents the excess of the purchase price of a business over the fair market value of its net assets.', '1', 19, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(57, 'Patents', 'patents', NULL, 'An asset account that represents the exclusive right to manufacture, use, or sell a particular invention or process.', '1', 19, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(58, 'Notes Payable', 'notes-payable', '2010', 'A liability account that represents the amount owed by the business for money borrowed through a written promissory note.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(59, 'Notes Payable to Banks', 'notes-payable-to-banks', '2110', 'A liability account that represents the amount owed by the business for money borrowed from banks through a written promissory note.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(60, 'Notes Payable to Related Parties', 'notes-payable-to-related-parties', '2120', 'A liability account that represents the amount owed by the business for money borrowed from related parties through a written promissory note.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(61, 'Notes Payable Secured by Assets', 'notes-payable-secured-by-assets', '2130', 'A liability account that represents the amount owed by the business for money borrowed through a written promissory note secured by the business assets.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(62, 'Notes Payable Unsecured', 'notes-payable-unsecured', '2140', 'A liability account that represents the amount owed by the business for money borrowed through a written promissory note that is not secured by the business assets.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(63, 'Discount on Notes Payable', 'discount-on-notes-payable', '2150', 'A contra-liability account that represents the difference between the face value of a note payable and the amount received by the business as proceeds.', '1', 30, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(64, 'Interest Payable on Notes Payable', 'interest-payable-on-notes-payable', '2160', 'A liability account that represents the amount of interest owed by the business on outstanding notes payable.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(65, 'Accounts Payable', 'accounts-payable', NULL, 'A liability account that represents the amount owed by the business to suppliers for goods and services purchased on credit.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(66, 'Dimension Adjustments', 'dimension-adjustments', NULL, '', '1', 44, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(67, 'Trade Payables', 'trade-payables', NULL, ' A category of accounts payable that includes amounts owed to suppliers for inventory and supplies purchased on credit.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(68, 'Accrued Expenses Payable', 'accrued-expenses-payable', NULL, 'A liability account that represents the amount of expenses that have been incurred by the business but have not yet been paid.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(69, 'Salaries and Wages Payable', 'salaries-and-wages-payable', NULL, ' A liability account that represents the amount of salaries and wages owed by the business to its employees.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(70, 'Interest Payable', 'interest-payable', NULL, ' A liability account that represents the amount of interest owed by the business on outstanding loans and other credit facilities.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(71, 'Rent Payable', 'rent-payable', NULL, 'A liability account that represents the amount of rent owed by the business for the use of leased property.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(72, 'Tax Payable', 'tax-payable', NULL, 'A liability account that represents the amount of taxes owed by the business to the government.', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(73, 'Utilities Payable', 'utilities-payable', NULL, 'A liability account that represents the amount of utility bills owed by the business', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(74, 'Warranty Payable', 'warranty-payable', NULL, '', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(75, 'Other Payables', 'other-payables', NULL, '', '1', 31, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(76, 'Unearned Revenue', 'unearned-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(77, 'Unearned Subscription Revenue', 'unearned-subscription-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(78, 'Unearned Membership Dues', 'unearned-membership-dues', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(79, 'Unearned Consulting Revenue', 'unearned-consulting-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(80, 'Unearned Legal Fees Revenue', 'unearned-legal-fees-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(81, 'Unearned Accounting Fees Revenue', 'unearned-accounting-fees-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(82, 'Unearned Advertising Revenue', 'unearned-advertising-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(83, 'Unearned Software License Revenue', 'unearned-software-license-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(84, 'Unearned Maintenance Revenue', 'unearned-maintenance-revenue', NULL, '', '1', 32, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(85, 'Unearned Rent Revenue', 'unearned-rent-revenue', NULL, '', '1', 34, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(86, 'Dividends Payable', 'dividends-payable', NULL, '', '1', 36, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(87, 'Income Tax Payable', 'income-tax-payable', NULL, '', '1', 37, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(88, 'Bonds Payable', 'bonds-payable', NULL, '', '1', 38, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(89, 'Discount on Bonds Payable', 'discount-on-bonds-payable', NULL, '', '1', 39, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(90, 'Premium on Bonds Payable', 'premium-on-bonds-payable', NULL, '', '1', 40, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(91, 'Mortgage Payable', 'mortgage-payable', NULL, 'Amount owed for a mortgage loan', '1', 41, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(92, 'Employee Reimbursements', 'employee-reimbursements', NULL, '', '1', 44, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(93, 'Opening Balance Adjustments', 'opening-balance-adjustments', NULL, '', '1', 42, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(94, 'Owners Equity', 'owners-equity', '3000', '', '1', 47, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(95, 'Opening Balance Offset', 'opening-balance-offset', '3000', '', '1', 47, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(96, 'Owners Capital', 'owners-capital', '3000', '', '1', 48, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(97, 'Drawings', 'drawings', '3000', '', '1', 49, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(98, 'Paid-in Capital in Excess of Par Preferred Stock', 'paid-in-capital-in-excess-of-par-preferred-stock', NULL, '', '1', 50, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(99, 'Treasury Stock', 'treasury-stock', NULL, '', '1', 51, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(100, 'Retained Earnings', 'retained-earnings', NULL, '', '1', 52, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(101, 'Dividends Paid', 'dividends-paid', NULL, '', '1', 53, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(102, 'General Income', 'general-income', NULL, '', '1', 55, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(103, 'Interest Income', 'interest-income', NULL, '', '1', 55, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(104, 'Late Fee Income', 'late-fee-income', NULL, '', '1', 55, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(105, 'Other Charges', 'other-charges', NULL, '', '1', 55, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(106, 'Service Revenue', 'service-revenue', NULL, '', '1', 58, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(107, 'Sales', 'sales', NULL, '', '1', 59, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(108, 'Sales Revenue', 'sales-revenue', NULL, '', '1', 59, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(109, 'Discount', 'discount', NULL, '', '1', 60, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(110, 'Sales Returns and Allowances', 'sales-returns-and-allowances', NULL, '', '1', 61, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(111, 'Interest Revenue', 'interest-revenue', NULL, '', '1', 56, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(112, 'Office Supplies Expense', 'office-supplies-expense', NULL, '', '1', 67, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(113, 'Depreciation Expense - Administrative', 'depreciation-expense-administrative', NULL, '', '1', 71, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(114, 'Professional Fees Expense', 'professional-fees-expense', NULL, '', '1', 95, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(115, 'Amortization Expense', 'amortization-expense', NULL, '', '1', 68, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(116, 'Bad Debt', 'bad-debt', NULL, '', '1', 69, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(117, 'Cost of Goods Sold', 'cost-of-goods-sold', NULL, 'The direct costs incurred in producing goods sold by a company.', '1', 70, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(118, 'Depreciation Expense', 'depreciation-expense', NULL, '', '1', 71, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(119, 'Freight-Out', 'freight-out', NULL, '', '1', 73, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(120, 'Income Tax Expense', 'income-tax-expense', NULL, 'The amount of income tax that a company is obligated to pay based on its taxable income.', '1', 74, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(121, 'Insurance Expense', 'insurance-expense', NULL, 'The cost of insurance policies for the protection of the business against various risks', '1', 75, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(122, 'Interest Expense', 'interest-expense', NULL, 'The cost of borrowing money, typically associated with loans, bonds, or other debt instruments.', '1', 76, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(123, 'Loss on Disposal of Plant Assets', 'loss-on-disposal-of-plant-assets', NULL, 'The amount of loss incurred by a company when it sells or disposes of a plant asset for an amount less than its book value.', '1', 77, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(124, 'Repairs and Maintenance', 'repairs-and-maintenance', NULL, '', '1', 78, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(125, 'Rent Expense', 'rent-expense', NULL, 'The cost of renting office or business space for a period of time.', '1', 94, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(126, 'Salaries and Employee Wages', 'salaries-and-employee-wages', NULL, 'The total amount of money paid to employees during a specific period of time.', '1', 93, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(127, 'Shipping Charge', 'shipping-charge', NULL, '', '1', 81, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(128, 'Advertising And Marketing', 'advertising-and-marketing', NULL, 'The cost of promoting a companys products or services through various media channels, such as print, radio, television, or digital advertising.', '1', 92, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(129, 'Commissions Expense', 'commissions-expense', NULL, 'The amount paid to salespeople or agents for selling a companys products or services.', '1', 81, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(130, 'Delivery Expense', 'delivery-expense', NULL, 'The cost of delivering products to customers, including transportation, labor, and packaging expenses.', '1', 81, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(131, 'Automobile Expense', 'automobile-expense', NULL, 'The cost of delivering products to customers, including transportation, labor, and packaging expenses.', '1', 81, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(132, 'Trade Show Expense', 'trade-show-expense', NULL, 'The cost of participating in trade shows or exhibitions to promote a companys products or services to potential customers or partners.', '1', 90, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(133, 'Supplies Expense', 'supplies-expense', NULL, 'The cost of supplies used in the day-to-day operations of a business, such as office supplies, cleaning supplies, or manufacturing supplies.', '1', 82, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(134, 'Utilities Expense', 'utilities-expense', NULL, 'The cost of utilities, such as electricity, gas, water, and internet, used by the company for its operations.', '1', 83, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(135, 'Consultant Expense', 'consultant-expense', NULL, '', '1', 95, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(136, 'Credit Card Charges', 'credit-card-charges', NULL, '', '1', 84, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(137, 'IT and Internet Expenses', 'it-and-internet-expenses', NULL, '', '1', 84, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(138, 'Janitorial Expense', 'janitorial-expense', NULL, '', '1', 89, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(139, 'Postage', 'postage', NULL, '', '1', 88, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(140, 'Printing and Stationery', 'printing-and-stationery', NULL, '', '1', 84, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(141, 'Telephone Expense', 'telephone-expense', NULL, '', '1', 84, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(142, 'Travel Expense', 'travel-expense', NULL, 'The cost of travel, lodging, and meals incurred by salespeople and other employees while traveling for business purposes, including attending meetings, conferences, or other events related to sales or business development.', '1', 85, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(143, 'Lodging', 'lodging', NULL, '', '1', 87, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(144, 'Meals and Entertainment', 'meals-and-entertainment', NULL, '', '1', 86, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(145, 'Purchase Discounts', 'purchase-discounts', NULL, '', '1', 65, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(146, 'Bank Fees and Charges', 'bank-fees-and-charges', NULL, '', '1', 91, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(147, 'Uncategorized', 'uncategorized', NULL, '', '1', 96, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(148, 'Other Expense', 'other-expense', NULL, '', '1', 96, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(149, 'Exchange Gain or Loss', 'exchange-gain-or-loss', NULL, '', '1', 72, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(150, 'Long Term Loan From Bank', 'long-term-loan-from-bank', NULL, '', '1', 46, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(151, 'Cash at Bank', 'cash-at-bank', NULL, '', '1', 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `chart_of_account_tags`
--

CREATE TABLE `chart_of_account_tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `chart_of_account_id` bigint(20) UNSIGNED NOT NULL,
  `tag_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chart_of_account_tags`
--

INSERT INTO `chart_of_account_tags` (`id`, `chart_of_account_id`, `tag_id`, `created_at`, `updated_at`) VALUES
(1, 1, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(2, 1, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(3, 2, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(4, 2, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(5, 3, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(6, 3, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(7, 4, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(8, 4, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(9, 5, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(10, 5, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(11, 6, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(12, 6, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(13, 7, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(14, 7, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(15, 8, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(16, 8, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(17, 9, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(18, 9, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(19, 10, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(20, 10, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(21, 11, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(22, 12, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(23, 13, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(24, 14, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(25, 14, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(26, 15, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(27, 15, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(28, 16, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(29, 16, 11, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(30, 17, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(31, 17, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(32, 18, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(33, 18, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(34, 19, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(35, 19, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(36, 20, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(37, 20, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(38, 21, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(39, 21, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(40, 22, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(41, 22, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(42, 23, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(43, 23, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(44, 24, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(45, 24, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(46, 25, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(47, 25, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(48, 26, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(49, 27, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(50, 28, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(51, 29, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(52, 30, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(53, 31, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(54, 32, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(55, 33, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(56, 34, 1, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(57, 35, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(58, 36, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(59, 37, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(60, 38, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(61, 39, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(62, 40, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(63, 41, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(64, 42, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(65, 43, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(66, 44, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(67, 45, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(68, 46, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(69, 47, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(70, 48, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(71, 49, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(72, 50, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(73, 51, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(74, 53, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(75, 55, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(76, 56, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(77, 57, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(78, 58, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(79, 58, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(80, 58, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(81, 59, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(82, 59, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(83, 59, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(84, 60, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(85, 60, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(86, 60, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(87, 61, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(88, 61, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(89, 61, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(90, 62, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(91, 62, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(92, 62, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(93, 63, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(94, 63, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(95, 64, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(96, 65, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(97, 66, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(98, 66, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(99, 67, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(100, 68, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(101, 68, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(102, 69, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(103, 69, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(104, 70, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(105, 70, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(106, 71, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(107, 71, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(108, 72, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(109, 72, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(110, 73, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(111, 73, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(112, 74, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(113, 74, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(114, 75, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(115, 75, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(116, 76, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(117, 77, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(118, 78, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(119, 79, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(120, 80, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(121, 81, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(122, 82, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(123, 83, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(124, 84, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(125, 85, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(126, 86, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(127, 86, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(128, 87, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(129, 87, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(130, 88, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(131, 88, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(132, 89, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(133, 90, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(134, 91, 2, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(135, 91, 7, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(136, 92, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(137, 93, 6, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(138, 93, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(139, 94, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(140, 95, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(141, 96, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(142, 97, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(143, 98, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(144, 99, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(145, 100, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(146, 101, 8, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(147, 102, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(148, 103, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(149, 104, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(150, 105, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(151, 106, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(152, 106, 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(153, 107, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(154, 107, 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(155, 108, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(156, 108, 10, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(157, 110, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(158, 111, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(159, 112, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(160, 113, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(161, 114, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(162, 115, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(163, 116, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(164, 117, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(165, 118, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(166, 119, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(167, 120, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(168, 121, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(169, 122, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(170, 123, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(171, 124, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(172, 125, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(173, 126, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(174, 127, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(175, 128, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(176, 129, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(177, 130, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(178, 131, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(179, 132, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(180, 133, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(181, 134, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(182, 135, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(183, 136, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(184, 137, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(185, 138, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(186, 139, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(187, 140, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(188, 141, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(189, 142, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(190, 143, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(191, 144, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(192, 145, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(193, 146, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(194, 147, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(195, 148, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(196, 149, 5, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(197, 149, 9, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(198, 150, 4, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(199, 151, 3, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(200, 151, 12, '2024-08-26 09:26:04', '2024-08-26 09:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `chart_of_account_types`
--

CREATE TABLE `chart_of_account_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `hint` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chart_of_account_types`
--

INSERT INTO `chart_of_account_types` (`id`, `name`, `category`, `type`, `hint`, `created_at`, `updated_at`) VALUES
(1, 'Advance Tax', 'advance-tax', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(2, 'Cash and cash equivalent', 'cash-and-cash-equivalent', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(3, 'Accounts Receivable', 'accounts-receivable', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(4, 'Advance Deposits and Prepayments', 'advance-deposits-and-prepayments', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(5, 'Allowance for Doubtful Accounts', 'allowance-for-doubtful-accounts', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(6, 'Interest Receivable', 'interest-receivable', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(7, 'Inventory', 'inventory', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(8, 'Office Supplies', 'office-supplies', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(9, 'Cleaning and Washing', 'cleaning-and-washing', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(10, 'Property Plant and Equipment', 'property-plant-and-equipment', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(11, 'Prepaid Insurance', 'prepaid-insurance', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(12, 'Prepaid Rent', 'prepaid-rent', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(13, 'Prepaid Expense', 'prepaid-expense', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(14, 'Land', 'land', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(15, 'Equipment', 'equipment', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(16, 'Accumulated Depreciation Equipment', 'accumulated-depreciation-equipment', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(17, 'Buildings', 'buildings', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(18, 'Accumulated Depreciation Buildings', 'accumulated-depreciation-buildings', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(19, 'Intangible Asset', 'intangible-asset', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(20, 'Trade Receivable', 'trade-receivable', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(21, 'Bank', 'bank', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(22, 'Fixed Asset', 'fixed-asset', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(23, 'Stock', 'stock', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(24, 'Other Asset', 'other-asset', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(25, 'Other Current Asset', 'other-current-asset', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(26, 'Cash', 'cash', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(27, 'Payment Clearing', 'payment-clearing', 'asset', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(28, 'Allowance for Doubtful Debt', 'allowance-for-doubtful-debt', 'liability', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(29, 'Bank Overdraft', 'bank-overdraft', 'liability', NULL, '2024-08-26 09:26:03', '2024-08-26 09:26:03'),
(30, 'Loan', 'loan', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(31, 'Accounts Payable', 'accounts-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(32, 'Unearned Service Revenue', 'unearned-service-revenue', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(33, 'Salaries and Wages Payable', 'salaries-and-wages-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(34, 'Unearned Rent Revenue', 'unearned-rent-revenue', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(35, 'Interest Payable', 'interest-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(36, 'Dividends Payable', 'dividends-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(37, 'Income Tax Payable', 'income-tax-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(38, 'Bonds Payable', 'bonds-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(39, 'Discount on Bonds Payable', 'discount-on-bonds-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(40, 'Premium on Bonds Payable', 'premium-on-bonds-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(41, 'Mortgage Payable', 'mortgage-payable', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(42, 'Opening Balance Adjustments', 'opening-balance-adjustments', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(43, 'Credit Card', 'credit-card', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(44, 'Other Liability', 'other-liability', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(45, 'Other Current Liability', 'other-current-liability', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(46, 'Long Term Liability', 'long-term-liability', 'liability', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(47, 'Equity', 'equity', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(48, 'Owners Capital', 'owners-capital', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(49, 'Owners Drawings', 'owners-drawings', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(50, 'Share Premium', 'share-premium', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(51, 'Treasury Stock', 'treasury-stock', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(52, 'Retained Earnings', 'retained-earnings', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(53, 'Dividends', 'dividends', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(54, 'Income Summary', 'income-summary', 'owners-equity', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(55, 'Income', 'income', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(56, 'Interest Income', 'interest-income', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(57, 'Other Income', 'other-income', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(58, 'Service Revenue', 'service-revenue', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(59, 'Sales Revenue', 'sales-revenue', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(60, 'Sales Discounts', 'sales-discounts', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(61, 'Sales Returns and Allowances', 'sales-returns-and-allowances', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(62, 'Interest Revenue', 'interest-revenue', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(63, 'Gain on Disposal of Plant Assets', 'gain-on-disposal-of-plant-assets', 'income', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(64, 'Cash Discounts', 'cash-discounts', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(65, 'Expense', 'expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(66, 'Finance Cost', 'finance-cost', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(67, 'Office Supplies Expense', 'office-supplies-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(68, 'Amortization Expense', 'amortization-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(69, 'Bad Debt Expense', 'bad-debt-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(70, 'Cost of Goods Sold', 'cost-of-goods-sold', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(71, 'Depreciation Expense', 'depreciation-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(72, 'Exchange Gain or Loss', 'exchange-gain-or-loss', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(73, 'Freight-Out', 'freight-out', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(74, 'Income Tax Expense', 'income-tax-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(75, 'Insurance Expense', 'insurance-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(76, 'Interest Expense', 'interest-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(77, 'Loss on Disposal of Plant Assets', 'loss-on-disposal-of-plant-assets', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(78, 'Maintenance and Repairs Expense', 'maintenance-and-repairs-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(79, 'Rent Expense', 'rent-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(80, 'Salaries and Wages Expense', 'salaries-and-wages-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(81, 'Selling Expense', 'selling-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(82, 'Supplies Expense', 'supplies-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(83, 'Utilities Expense', 'utilities-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(84, 'Operating Expense', 'operating-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(85, 'Travel Expense', 'travel-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(86, 'Entertainment Expense', 'entertainment-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(87, 'Lodging', 'lodging', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(88, 'Postage and Courier Expense', 'postage-and-courier-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(89, 'Cleaning and Washing Expense', 'cleaning-and-washing-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(90, 'Trade Show Expense', 'trade-show-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(91, 'Bank Charges Expense', 'bank-charges-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(92, 'Advertising And Marketing Expense', 'advertising-and-marketing-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(93, 'Salary and Wages Expense', 'salary-and-wages-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(94, 'Office Rent Expense', 'office-rent-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(95, 'Professional Fee Expense', 'professional-fee-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(96, 'Other Expense', 'other-expense', 'expense', NULL, '2024-08-26 09:26:04', '2024-08-26 09:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `currency`, `created_at`, `updated_at`) VALUES
(1, 'A CUSTOMER', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:17', '2024-08-26 12:38:23'),
(2, 'B CUSTOMER', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:29', '2024-08-26 12:38:29'),
(3, 'C CUSTOMER', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:35', '2024-08-26 12:38:35');

-- --------------------------------------------------------

--
-- Table structure for table `expenses`
--

CREATE TABLE `expenses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `expense_number` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `amount` double NOT NULL,
  `currency` varchar(255) DEFAULT 'bdt',
  `tax` double DEFAULT NULL,
  `expense_note` varchar(255) DEFAULT NULL,
  `vendor_id` bigint(20) UNSIGNED DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `chart_of_account_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expenses`
--

INSERT INTO `expenses` (`id`, `expense_number`, `description`, `date`, `amount`, `currency`, `tax`, `expense_note`, `vendor_id`, `customer_id`, `chart_of_account_id`, `created_at`, `updated_at`) VALUES
(1, 'EXP-001', 'SONIKA BD SHIPPERS LTD', '2024-08-13', 123, NULL, NULL, 'asdasd', NULL, NULL, NULL, '2024-08-26 17:18:27', '2024-08-26 17:18:27'),
(2, 'EXP-002', 'SONIKA BD SHIPPERS LTD', '2024-08-27', 300, NULL, NULL, 'CHEQUE-40', NULL, NULL, NULL, '2024-08-26 17:48:12', '2024-08-26 17:48:12');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invoice_number` varchar(255) NOT NULL,
  `issue_date` date NOT NULL,
  `invoice_due_date` date NOT NULL,
  `destination` varchar(255) NOT NULL,
  `master_air_way_bill` varchar(255) DEFAULT NULL,
  `master_air_way_bill_fee` double DEFAULT NULL,
  `unit` int(11) DEFAULT NULL,
  `cartoon_amount` int(11) NOT NULL,
  `gross_weight` double DEFAULT NULL,
  `chargeable_weight` double DEFAULT NULL,
  `kg` double DEFAULT NULL,
  `invoice_rate` double DEFAULT NULL,
  `invoice_freight_amount` double DEFAULT NULL,
  `thc` double DEFAULT NULL,
  `ssc` double DEFAULT NULL,
  `cd` double DEFAULT NULL,
  `cgc` double DEFAULT NULL,
  `dtc` double DEFAULT NULL,
  `ait` double DEFAULT NULL,
  `ams` double DEFAULT NULL,
  `itt` double DEFAULT NULL,
  `others` double DEFAULT NULL,
  `invoice_vat` double DEFAULT NULL,
  `invoice_total_usd` double DEFAULT NULL,
  `exchange_rate` double NOT NULL DEFAULT 0,
  `invoice_receivable_amount_bdt` double NOT NULL DEFAULT 0,
  `invoice_received_amount` double NOT NULL DEFAULT 0,
  `invoice_due_balance` double NOT NULL DEFAULT 0,
  `invoice_discounted_amount` double DEFAULT 0,
  `invoice_note` text DEFAULT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `chart_of_account_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`id`, `invoice_number`, `issue_date`, `invoice_due_date`, `destination`, `master_air_way_bill`, `master_air_way_bill_fee`, `unit`, `cartoon_amount`, `gross_weight`, `chargeable_weight`, `kg`, `invoice_rate`, `invoice_freight_amount`, `thc`, `ssc`, `cd`, `cgc`, `dtc`, `ait`, `ams`, `itt`, `others`, `invoice_vat`, `invoice_total_usd`, `exchange_rate`, `invoice_receivable_amount_bdt`, `invoice_received_amount`, `invoice_due_balance`, `invoice_discounted_amount`, `invoice_note`, `customer_id`, `chart_of_account_id`, `created_at`, `updated_at`) VALUES
(1, 'SBDL-1', '2024-08-04', '2024-08-10', 'DEL', '228-8882-6485', 230, 1, 42, 1996, 1996, 1996, 2.13, 4251.48, 23, 21, 13, 35, 45, 36, 88, 44, 1, 20, 4807.48, 110, 528000, 70000, 458000, 800, 'TEST', 1, 14, '2024-08-26 12:40:38', '2024-08-26 16:26:20'),
(2, 'SBDL-2', '2024-08-11', '2024-08-17', 'CHI', '444-9999-111', 45, 1, 13, 44, 44, 44, 3.6, 158.4, 33, 12, 65, 48, 33, 123, 65, 78, 99, 0, 759.4, 130, 98722, 0, 98722, 0, 'TEST', 2, NULL, '2024-08-26 12:43:01', '2024-08-26 12:43:01'),
(3, 'SBDL-3', '2024-08-11', '2024-08-17', 'BAN', '111-222-3333', 20, 1, 32, 78, 78, 78, 3, 234, 112, 332, 45, 65, 78, 98, 13, 4, 4, 0, 1005, 110, 110550, 0, 110550, 0, 'TEST', 1, NULL, '2024-08-26 13:58:56', '2024-08-26 13:58:56');

-- --------------------------------------------------------

--
-- Table structure for table `manual_journals`
--

CREATE TABLE `manual_journals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `manual_journal_number` varchar(255) NOT NULL,
  `manual_journal_date` date NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `manual_journal_details`
--

CREATE TABLE `manual_journal_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2014_10_12_100000_create_password_resets_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_07_01_112253_create_banks_table', 1),
(7, '2024_07_01_112254_create_bank_accounts_table', 1),
(8, '2024_07_01_112255_create_customers_table', 1),
(9, '2024_07_06_123724_create_vendors_table', 1),
(10, '2024_07_06_142157_create_charges_table', 1),
(11, '2024_07_06_165758_create_manual_journals_table', 1),
(12, '2024_07_06_170157_create_manual_journal_details_table', 1),
(13, '2024_07_07_100742_create_organizations_table', 1),
(14, '2024_07_08_065846_create_tags_table', 1),
(15, '2024_07_08_123917_create_chart_of_account_types_table', 1),
(16, '2024_07_09_070009_create_chart_of_accounts_table', 1),
(17, '2024_07_09_070052_create_chart_of_account_tags_table', 1),
(18, '2024_07_09_070053_create_invoices_table', 1),
(19, '2024_07_14_060501_create_bills_table', 1),
(20, '2024_07_14_060503_create_expenses_table', 1),
(21, '2024_07_14_060508_create_transactions_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `organizations`
--

CREATE TABLE `organizations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `invoice_prefix` varchar(255) DEFAULT NULL,
  `invoice_start_number` bigint(20) DEFAULT NULL,
  `opening_cash_balance` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `description`, `address`, `logo`, `currency`, `invoice_prefix`, `invoice_start_number`, `opening_cash_balance`, `created_at`, `updated_at`) VALUES
(1, 'SONIKA', 'SONIKA BD SHIPPERS LTD', 'Uttara, Dhaka', 'uploads/logo/1724697385.png', 'BDT', 'SBDL', 1, 78000, '2024-08-26 09:26:03', '2024-08-26 17:18:27');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(58, 'App\\Models\\User', 1, 'myAppToken', 'a97cfe886dfc0d4da7f1c4467425316c2500f0a5a3de8ddd87db05d6c13c4a40', '[\"*\"]', '2024-08-26 17:51:17', NULL, '2024-08-26 17:46:31', '2024-08-26 17:51:17');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'receivable', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(2, 'payable', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(3, 'current-asset', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(4, 'non-current-asset', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(5, 'operating-expense', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(6, 'current-liability', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(7, 'non-current-liability', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(8, 'owners-equity', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(9, 'income', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(10, 'revenue', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(11, 'cash', '2024-08-26 09:26:04', '2024-08-26 09:26:04'),
(12, 'bank', '2024-08-26 09:26:04', '2024-08-26 09:26:04');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `current_amount` double NOT NULL DEFAULT 0,
  `transaction_type` varchar(255) NOT NULL,
  `transaction_date` date NOT NULL,
  `is_debit` tinyint(1) NOT NULL DEFAULT 0,
  `invoice_number` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `transaction_note` varchar(255) DEFAULT NULL,
  `chart_of_account_id` bigint(20) UNSIGNED DEFAULT NULL,
  `bank_account_id` bigint(20) UNSIGNED DEFAULT NULL,
  `bill_id` bigint(20) UNSIGNED DEFAULT NULL,
  `invoice_id` bigint(20) UNSIGNED DEFAULT NULL,
  `expense_id` bigint(20) UNSIGNED DEFAULT NULL,
  `manual_journal_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `amount`, `current_amount`, `transaction_type`, `transaction_date`, `is_debit`, `invoice_number`, `payment_method`, `transaction_note`, `chart_of_account_id`, `bank_account_id`, `bill_id`, `invoice_id`, `expense_id`, `manual_journal_id`, `created_at`, `updated_at`) VALUES
(1, 528822.8, 0, 'invoice', '2024-08-26', 1, 'SBDL-1', NULL, NULL, 17, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:40:38', '2024-08-26 12:40:38'),
(2, 0, 0, 'invoice', '2024-08-26', 0, 'SBDL-1', NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:40:38', '2024-08-26 12:40:38'),
(3, 0, 0, 'bill', '2024-08-26', 1, 'SBDL-1', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, '2024-08-26 12:40:38', '2024-08-26 12:40:38'),
(4, 367444, 0, 'bill', '2024-08-26', 0, 'SBDL-1', NULL, NULL, 65, NULL, 1, NULL, NULL, NULL, '2024-08-26 12:40:38', '2024-08-26 12:40:38'),
(5, 98722, 0, 'invoice', '2024-08-26', 1, 'SBDL-2', NULL, NULL, 17, NULL, NULL, 2, NULL, NULL, '2024-08-26 12:43:02', '2024-08-26 12:43:02'),
(6, 0, 0, 'invoice', '2024-08-26', 0, 'SBDL-2', NULL, NULL, NULL, NULL, NULL, 2, NULL, NULL, '2024-08-26 12:43:02', '2024-08-26 12:43:02'),
(7, 0, 0, 'bill', '2024-08-26', 1, 'SBDL-2', NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, '2024-08-26 12:43:02', '2024-08-26 12:43:02'),
(8, 90142, 0, 'bill', '2024-08-26', 0, 'SBDL-2', NULL, NULL, 65, NULL, 2, NULL, NULL, NULL, '2024-08-26 12:43:02', '2024-08-26 12:43:02'),
(9, 523822.8, 5000, 'invoice', '2024-08-26', 1, 'SBDL-1', 'cash', 'CASH-666', 17, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:44:06', '2024-08-26 12:44:06'),
(10, 5000, 5000, 'invoice', '2024-08-26', 0, 'SBDL-1', 'cash', 'CASH-666', 107, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:44:06', '2024-08-26 12:44:06'),
(11, 508822.8, 15000, 'invoice', '2024-08-26', 1, 'SBDL-1', 'cash', 'CASH-01', 17, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:44:27', '2024-08-26 12:44:27'),
(12, 20000, 15000, 'invoice', '2024-08-26', 0, 'SBDL-1', 'cash', 'CASH-01', 107, NULL, NULL, 1, NULL, NULL, '2024-08-26 12:44:27', '2024-08-26 12:44:27'),
(13, 458000, 50000, 'invoice', '2024-08-26', 1, 'SBDL-1', 'bank', 'DISCOUNT-800', 17, 1, NULL, 1, NULL, NULL, '2024-08-26 12:44:56', '2024-08-26 16:26:20'),
(14, 70000, 50000, 'invoice', '2024-08-26', 0, 'SBDL-1', 'bank', 'CHEQUE-354440012', 14, 1, NULL, 1, NULL, NULL, '2024-08-26 12:44:56', '2024-08-26 12:44:56'),
(15, 110550, 0, 'invoice', '2024-08-26', 1, 'SBDL-3', NULL, NULL, 17, NULL, NULL, 3, NULL, NULL, '2024-08-26 13:58:56', '2024-08-26 13:58:56'),
(16, 0, 0, 'invoice', '2024-08-26', 0, 'SBDL-3', NULL, NULL, NULL, NULL, NULL, 3, NULL, NULL, '2024-08-26 13:58:56', '2024-08-26 13:58:56'),
(17, 0, 0, 'bill', '2024-08-26', 1, 'SBDL-3', NULL, NULL, NULL, NULL, 3, NULL, NULL, NULL, '2024-08-26 13:58:56', '2024-08-26 13:58:56'),
(18, 101970, 0, 'bill', '2024-08-26', 0, 'SBDL-3', NULL, NULL, 65, NULL, 3, NULL, NULL, NULL, '2024-08-26 13:58:56', '2024-08-26 13:58:56'),
(19, 20000, 20000, 'bill', '2024-08-26', 1, 'SBDL-3', 'cash', 'CASH-111', 2, NULL, 3, NULL, NULL, NULL, '2024-08-26 14:53:00', '2024-08-26 14:53:00'),
(20, 81970, 20000, 'bill', '2024-08-26', 0, 'SBDL-3', 'cash', 'CASH-111', 65, NULL, 3, NULL, NULL, NULL, '2024-08-26 14:53:00', '2024-08-26 14:53:00'),
(21, 45000, 25000, 'bill', '2024-08-26', 1, 'SBDL-3', 'bank', 'CHEQUE-458', 14, 1, 3, NULL, NULL, NULL, '2024-08-26 14:54:27', '2024-08-26 14:54:27'),
(22, 56970, 25000, 'bill', '2024-08-26', 0, 'SBDL-3', 'bank', 'CHEQUE-458', 65, 1, 3, NULL, NULL, NULL, '2024-08-26 14:54:27', '2024-08-26 14:54:27'),
(23, 48000, 3000, 'bill', '2024-08-26', 1, 'SBDL-3', 'cash', 'CASH-222', 2, NULL, 3, NULL, NULL, NULL, '2024-08-26 15:03:50', '2024-08-26 15:03:50'),
(24, 53970, 3000, 'bill', '2024-08-26', 0, 'SBDL-3', 'cash', 'CASH-222', 65, NULL, 3, NULL, NULL, NULL, '2024-08-26 15:03:50', '2024-08-26 15:03:50'),
(25, 78000, 78000, 'deposit', '2024-08-26', 1, NULL, 'cash', 'CHEQUE-4560', NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-26 15:39:32', '2024-08-26 15:39:32'),
(26, 78000, 78000, 'withdraw', '2024-08-26', 0, NULL, 'bank', 'CHEQUE-4560', NULL, 1, NULL, NULL, NULL, NULL, '2024-08-26 15:39:32', '2024-08-26 15:39:32'),
(27, 123, 123, 'expense', '2024-08-26', 1, 'EXP-001', 'cash', 'asdasd', NULL, NULL, NULL, NULL, 1, NULL, '2024-08-26 17:18:27', '2024-08-26 17:18:27'),
(28, 123, 123, 'expense', '2024-08-26', 0, 'EXP-001', 'cash', 'asdasd', NULL, NULL, NULL, NULL, 1, NULL, '2024-08-26 17:18:27', '2024-08-26 17:18:27'),
(29, 300, 300, 'expense', '2024-08-26', 1, 'EXP-002', 'bank', 'CHEQUE-40', NULL, 1, NULL, NULL, 2, NULL, '2024-08-26 17:48:12', '2024-08-26 17:48:12'),
(30, 300, 300, 'expense', '2024-08-26', 0, 'EXP-002', 'bank', 'CHEQUE-40', NULL, 1, NULL, NULL, 2, NULL, '2024-08-26 17:48:12', '2024-08-26 17:48:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@gmail.com', NULL, '$2y$12$EeEFOvM2A935BazOelbVle1dSBvEdiJdfGzsdyw/ngD8lGshBXQm6', NULL, '2024-08-26 12:35:30', '2024-08-26 12:35:30');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `name`, `email`, `phone`, `address`, `currency`, `created_at`, `updated_at`) VALUES
(1, 'A VENDOR', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:42', '2024-08-26 12:38:42'),
(2, 'B VENDOR', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:49', '2024-08-26 12:38:49'),
(3, 'C VENDOR', NULL, NULL, NULL, 'BDT', '2024-08-26 12:38:54', '2024-08-26 12:38:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `banks_name_unique` (`name`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bank_accounts_account_number_unique` (`account_number`),
  ADD KEY `bank_accounts_bank_id_foreign` (`bank_id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bills_vendor_id_foreign` (`vendor_id`),
  ADD KEY `bills_chart_of_account_id_foreign` (`chart_of_account_id`);

--
-- Indexes for table `charges`
--
ALTER TABLE `charges`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chart_of_accounts`
--
ALTER TABLE `chart_of_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chart_of_accounts_chart_of_account_type_id_foreign` (`chart_of_account_type_id`);

--
-- Indexes for table `chart_of_account_tags`
--
ALTER TABLE `chart_of_account_tags`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chart_of_account_tags_chart_of_account_id_foreign` (`chart_of_account_id`),
  ADD KEY `chart_of_account_tags_tag_id_foreign` (`tag_id`);

--
-- Indexes for table `chart_of_account_types`
--
ALTER TABLE `chart_of_account_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chart_of_account_types_name_unique` (`name`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `expenses`
--
ALTER TABLE `expenses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expenses_vendor_id_foreign` (`vendor_id`),
  ADD KEY `expenses_customer_id_foreign` (`customer_id`),
  ADD KEY `expenses_chart_of_account_id_foreign` (`chart_of_account_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_customer_id_foreign` (`customer_id`),
  ADD KEY `invoices_chart_of_account_id_foreign` (`chart_of_account_id`);

--
-- Indexes for table `manual_journals`
--
ALTER TABLE `manual_journals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `manual_journal_details`
--
ALTER TABLE `manual_journal_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_chart_of_account_id_foreign` (`chart_of_account_id`),
  ADD KEY `transactions_bank_account_id_foreign` (`bank_account_id`),
  ADD KEY `transactions_bill_id_foreign` (`bill_id`),
  ADD KEY `transactions_invoice_id_foreign` (`invoice_id`),
  ADD KEY `transactions_expense_id_foreign` (`expense_id`),
  ADD KEY `transactions_manual_journal_id_foreign` (`manual_journal_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `charges`
--
ALTER TABLE `charges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chart_of_accounts`
--
ALTER TABLE `chart_of_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT for table `chart_of_account_tags`
--
ALTER TABLE `chart_of_account_tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=201;

--
-- AUTO_INCREMENT for table `chart_of_account_types`
--
ALTER TABLE `chart_of_account_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `expenses`
--
ALTER TABLE `expenses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `manual_journals`
--
ALTER TABLE `manual_journals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `manual_journal_details`
--
ALTER TABLE `manual_journal_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD CONSTRAINT `bank_accounts_bank_id_foreign` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bills`
--
ALTER TABLE `bills`
  ADD CONSTRAINT `bills_chart_of_account_id_foreign` FOREIGN KEY (`chart_of_account_id`) REFERENCES `chart_of_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bills_vendor_id_foreign` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chart_of_accounts`
--
ALTER TABLE `chart_of_accounts`
  ADD CONSTRAINT `chart_of_accounts_chart_of_account_type_id_foreign` FOREIGN KEY (`chart_of_account_type_id`) REFERENCES `chart_of_account_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chart_of_account_tags`
--
ALTER TABLE `chart_of_account_tags`
  ADD CONSTRAINT `chart_of_account_tags_chart_of_account_id_foreign` FOREIGN KEY (`chart_of_account_id`) REFERENCES `chart_of_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chart_of_account_tags_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `expenses`
--
ALTER TABLE `expenses`
  ADD CONSTRAINT `expenses_chart_of_account_id_foreign` FOREIGN KEY (`chart_of_account_id`) REFERENCES `chart_of_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expenses_vendor_id_foreign` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_chart_of_account_id_foreign` FOREIGN KEY (`chart_of_account_id`) REFERENCES `chart_of_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `invoices_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_bank_account_id_foreign` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_bill_id_foreign` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_chart_of_account_id_foreign` FOREIGN KEY (`chart_of_account_id`) REFERENCES `chart_of_accounts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_expense_id_foreign` FOREIGN KEY (`expense_id`) REFERENCES `expenses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_invoice_id_foreign` FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transactions_manual_journal_id_foreign` FOREIGN KEY (`manual_journal_id`) REFERENCES `manual_journals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

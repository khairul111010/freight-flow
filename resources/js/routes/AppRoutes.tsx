import { RouteObject } from "react-router-dom";
import Layout from "../components/layouts";
import { AppRoutesEnum } from "../enums/routeEnums";
import BankAccountAdd from "../modules/bank_and_accounts/pages/BankAccountAdd";
import BankAccountEdit from "../modules/bank_and_accounts/pages/BankAccountEdit";
import BankAdd from "../modules/bank_and_accounts/pages/BankAdd";
import BankAndAccounts from "../modules/bank_and_accounts/pages/BankAndAccounts";
import BankEdit from "../modules/bank_and_accounts/pages/BankEdit";
import BankTransactions from "../modules/bank_and_accounts/pages/BankTransactions";
import Bills from "../modules/bills/pages/Bills";
import BillsEdit from "../modules/bills/pages/BillsEdit";
import CashReceiptPDF from "../modules/cash/components/CashReceiptPDF";
import CashTransactions from "../modules/cash/pages/CashTransactions";
import CustomerInvoices from "../modules/customers/pages/CustomerInvoices";
import Customers from "../modules/customers/pages/Customers";
import CustomersAdd from "../modules/customers/pages/CustomersAdd";
import CustomersEdit from "../modules/customers/pages/CustomersEdit";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import Invoice from "../modules/invoice/pages/Invoice";
import InvoiceAdd from "../modules/invoice/pages/InvoiceAdd";
import InvoiceEdit from "../modules/invoice/pages/InvoiceEdit";
import ProfitAndLoss from "../modules/profitandloss/pages/ProfitAndLoss";
import Settings from "../modules/settings/pages/Settings";
import VendorBills from "../modules/vendors/pages/VendorBills";
import Vendors from "../modules/vendors/pages/Vendors";
import VendorsAdd from "../modules/vendors/pages/VendorsAdd";
import VendorsEdit from "../modules/vendors/pages/VendorsEdit";

const appRoutes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <Dashboard />,
            },
            {
                path: AppRoutesEnum.PROFITANDLOSS,
                element: <ProfitAndLoss />,
            },
            {
                path: AppRoutesEnum.INVOICE,
                element: <Invoice />,
            },
            {
                path: AppRoutesEnum.INVOICE_ADD,
                element: <InvoiceAdd />,
            },
            {
                path: AppRoutesEnum.INVOICE_EDIT,
                element: <InvoiceEdit />,
            },
            // {
            //     path: AppRoutesEnum.INVOICE_PDF,
            //     element: <InvoicePDF />,
            // },
            {
                path: AppRoutesEnum.BILL,
                element: <Bills />,
            },
            {
                path: AppRoutesEnum.BILL_EDIT,
                element: <BillsEdit />,
            },
            {
                path: AppRoutesEnum.CUSTOMERS,
                element: <Customers />,
            },
            {
                path: AppRoutesEnum.CUSTOMERS_ADD,
                element: <CustomersAdd />,
            },
            {
                path: AppRoutesEnum.CUSTOMERS_EDIT,
                element: <CustomersEdit />,
            },
            {
                path: AppRoutesEnum.CUSTOMERS_INVOICE_VIEW,
                element: <CustomerInvoices />,
            },
            {
                path: AppRoutesEnum.VENDORS,
                element: <Vendors />,
            },
            {
                path: AppRoutesEnum.VENDORS_ADD,
                element: <VendorsAdd />,
            },
            {
                path: AppRoutesEnum.VENDORS_EDIT,
                element: <VendorsEdit />,
            },
            {
                path: AppRoutesEnum.VENDORS_BILLS_VIEW,
                element: <VendorBills />,
            },
            {
                path: AppRoutesEnum.BANK,
                element: <BankAndAccounts />,
            },
            {
                path: AppRoutesEnum.BANK_ADD,
                element: <BankAdd />,
            },
            {
                path: AppRoutesEnum.BANK_EDIT,
                element: <BankEdit />,
            },
            {
                path: AppRoutesEnum.BANK_ACCOUNT_ADD,
                element: <BankAccountAdd />,
            },
            {
                path: AppRoutesEnum.BANK_ACCOUNT_EDIT,
                element: <BankAccountEdit />,
            },
            {
                path: AppRoutesEnum.BANK_ACCOUNT_TRANSACTION,
                element: <BankTransactions />,
            },
            {
                path: AppRoutesEnum.CASH,
                element: <CashTransactions />,
            },
            {
                path: AppRoutesEnum.CASH_PDF,
                element: <CashReceiptPDF />,
            },
            {
                path: AppRoutesEnum.SETTINGS,
                element: <Settings />,
            },
        ],
    },
];

export default appRoutes;

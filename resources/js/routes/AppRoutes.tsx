import { RouteObject } from "react-router-dom";
import Layout from "../components/layouts";
import { AppRoutesEnum } from "../enums/routeEnums";
import Settings from "../modules/settings/pages/Settings";
import Customers from "../modules/customers/pages/Customers";
import Vendors from "../modules/vendors/pages/Vendors";
import CustomersAdd from "../modules/customers/pages/CustomersAdd";
import VendorsAdd from "../modules/vendors/pages/VendorsAdd";
import CustomersEdit from "../modules/customers/pages/CustomersEdit";
import VendorsEdit from "../modules/vendors/pages/VendorsEdit";
import Invoice from "../modules/invoice/pages/Invoice";
import BankAndAccounts from "../modules/bank_and_accounts/pages/BankAndAccounts";
import BankAdd from "../modules/bank_and_accounts/pages/BankAdd";
import BankEdit from "../modules/bank_and_accounts/pages/BankEdit";
import BankAccountAdd from "../modules/bank_and_accounts/pages/BankAccountAdd";
import BankAccountEdit from "../modules/bank_and_accounts/pages/BankAccountEdit";
import InvoiceAdd from "../modules/invoice/pages/InvoiceAdd";
import Bills from "../modules/bills/pages/Bills";
import Dashboard from "../modules/dashboard/pages/Dashboard";
import ProfitAndLoss from "../modules/profitandloss/pages/ProfitAndLoss";
import InvoiceEdit from "../modules/invoice/pages/InvoiceEdit";

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
            {
                path: AppRoutesEnum.BILL,
                element: <Bills />,
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
                path: AppRoutesEnum.SETTINGS,
                element: <Settings />,
            },
        ],
    },
];

export default appRoutes;

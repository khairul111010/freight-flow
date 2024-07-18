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

const appRoutes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <>Dashboard</>,
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
                path: AppRoutesEnum.SETTINGS,
                element: <Settings />,
            },
        ],
    },
];

export default appRoutes;

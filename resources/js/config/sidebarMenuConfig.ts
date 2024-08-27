import { IconBuildingBank, IconClipboardText, IconCoin, IconCoins, IconLicense, IconPlane, IconSettings, IconUsers } from "@tabler/icons-react"
import { MenuItemType } from "../components/sidebar/MenuItem"
import { AppRoutesEnum } from "../enums/routeEnums"


const sidebarMenuConfig: MenuItemType[] = [
    // {
    //     name: 'Dashboard',
    //     path: AppRoutesEnum.DASHBOARD,
    //     icon: IconHome2,
    //     requiredPermissions: []
    // },       
    {
        name: 'Profit and Loss',
        path: AppRoutesEnum.PROFITANDLOSS,
        icon: IconCoins,
        requiredPermissions: []
    },       
    {
        name: 'Customer Invoices',
        path: AppRoutesEnum.INVOICE,
        icon: IconClipboardText,
        requiredPermissions: []
    },       
    {
        name: 'Carrier Bills',
        path: AppRoutesEnum.BILL,
        icon: IconClipboardText,
        requiredPermissions: []
    },       
    {
        name: 'Carrier',
        path: AppRoutesEnum.VENDORS,
        icon: IconPlane,
        requiredPermissions: []
    },       
    {
        name: 'Customers',
        path: AppRoutesEnum.CUSTOMERS,
        icon: IconUsers,
        requiredPermissions: []
    },       
    {
        name: 'Bank and Accounts',
        path: AppRoutesEnum.BANK,
        icon: IconBuildingBank,
        requiredPermissions: []
    },       
    {
        name: 'Cash',
        path: AppRoutesEnum.CASH,
        icon: IconCoin,
        requiredPermissions: []
    },       
    {
        name: 'Expense',
        path: AppRoutesEnum.EXPENSE,
        icon: IconLicense,
        requiredPermissions: []
    },       
    {
        name: 'Settings',
        path: AppRoutesEnum.SETTINGS,
        icon: IconSettings,
        requiredPermissions: []
    },       
]




export { sidebarMenuConfig }


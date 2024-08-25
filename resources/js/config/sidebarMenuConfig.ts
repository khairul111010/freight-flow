import { IconBuildingBank, IconClipboardText, IconCoin, IconCoins, IconPlane, IconSettings, IconUsers } from "@tabler/icons-react"
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
        name: 'Invoices',
        path: AppRoutesEnum.INVOICE,
        icon: IconClipboardText,
        requiredPermissions: []
    },       
    {
        name: 'Bills',
        path: AppRoutesEnum.BILL,
        icon: IconClipboardText,
        requiredPermissions: []
    },       
    {
        name: 'Vendors',
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
        name: 'Settings',
        path: AppRoutesEnum.SETTINGS,
        icon: IconSettings,
        requiredPermissions: []
    },       
]




export { sidebarMenuConfig }


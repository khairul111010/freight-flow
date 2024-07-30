import { IconClipboardText, IconHome2, IconPlane, IconSettings, IconUsers } from "@tabler/icons-react"
import { MenuItemType } from "../components/sidebar/MenuItem"
import { AppRoutesEnum, AuthRoutesEnum } from "../enums/routeEnums"


const sidebarMenuConfig: MenuItemType[] = [
    {
        name: 'Dashboard',
        path: AppRoutesEnum.DASHBOARD,
        icon: IconHome2,
        requiredPermissions: []
    },       
    {
        name: 'Invoice',
        path: AppRoutesEnum.INVOICE,
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
        name: 'Settings',
        path: AppRoutesEnum.SETTINGS,
        icon: IconSettings,
        requiredPermissions: []
    },       
]




export { sidebarMenuConfig }


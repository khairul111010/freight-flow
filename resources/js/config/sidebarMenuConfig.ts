import { IconHome2, IconSettings } from "@tabler/icons-react"
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
        name: 'Settings',
        path: AppRoutesEnum.SETTINGS,
        icon: IconSettings,
        requiredPermissions: []
    },       
]




export { sidebarMenuConfig }


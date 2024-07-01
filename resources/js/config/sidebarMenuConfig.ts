import { IconHome2 } from "@tabler/icons-react"
import { MenuItemType } from "../components/sidebar/MenuItem"
import { AppRoutesEnum, AuthRoutesEnum } from "../enums/routeEnums"


const sidebarMenuConfig: MenuItemType[] = [
    {
        name: 'Dashboard',
        path: AppRoutesEnum.DASHBOARD,
        icon: IconHome2,
        requiredPermissions: []
    },       
]




export { sidebarMenuConfig }


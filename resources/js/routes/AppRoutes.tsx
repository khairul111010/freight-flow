import { RouteObject } from "react-router-dom";
import Layout from "../components/layouts";
import { AppRoutesEnum } from "../enums/routeEnums";
import Settings from "../modules/settings/pages/Settings";

const appRoutes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <>Dashboard</>,
            },
            {
                path: AppRoutesEnum.SETTINGS,
                element: <Settings />,
            },
        ],
    },
];

export default appRoutes;

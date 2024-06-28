import { RouteObject } from "react-router-dom";
import Layout from "../components/layouts";
import { AppRoutesEnum } from "../enums/routeEnums";

const appRoutes: RouteObject[] = [
    {
        element: <Layout />,
        children: [
            {
                path: AppRoutesEnum.DASHBOARD,
                element: <>Dashboard</>,
            },
        ],
    },
];

export default appRoutes;

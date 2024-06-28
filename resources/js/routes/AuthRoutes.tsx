import { Outlet, RouteObject } from "react-router-dom";
import { AuthRoutesEnum } from "../enums/routeEnums";
import Login from "../modules/auth/pages/Login";

const authRoutes: RouteObject[] = [
    {
        element: (
            <>
                <Outlet />
            </>
        ),
        children: [
            {
                path: AuthRoutesEnum.LOGIN,
                element: <Login />,
            },
        ],
    },
];

export default authRoutes;

import { Outlet, RouteObject } from "react-router-dom";
import { AuthRoutesEnum } from "../enums/routeEnums";
import Login from "../modules/auth/pages/Login";
import AuthLayout from "../components/layouts/AuthLayout";

const authRoutes: RouteObject[] = [
    {
        element: <AuthLayout />,
        children: [
            {
                path: AuthRoutesEnum.LOGIN,
                element: <Login />,
            },
        ],
    },
];

export default authRoutes;

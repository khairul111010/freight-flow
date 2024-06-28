import { Navigate, RouteObject } from "react-router-dom";
import { ErrorRoutesEnum } from "../enums/routeEnums";

const errorRoutes: RouteObject[] = [
    {
        path: ErrorRoutesEnum.NOT_FOUND,
        element: <>404</>,
    },
    {
        path: "/*",
        element: <Navigate to={ErrorRoutesEnum.NOT_FOUND} replace />,
    },
];

export default errorRoutes;

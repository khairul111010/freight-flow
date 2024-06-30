import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import appRoutes from "./AppRoutes";
import authRoutes from "./AuthRoutes";
import errorRoutes from "./ErrorRoutes";
import AppLayout from "../components/layouts/AppLayout";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [...appRoutes, ...authRoutes, ...errorRoutes],
    },
]);

const AllRoutes: FC = () => {
    return <RouterProvider router={router} />;
};

export default AllRoutes;

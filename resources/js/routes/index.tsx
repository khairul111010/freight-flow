import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import appRoutes from "./AppRoutes";
import authRoutes from "./AuthRoutes";
import errorRoutes from "./ErrorRoutes";

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

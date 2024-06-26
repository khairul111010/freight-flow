import { FC } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../Components/layouts";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <h1 className="bg-amber-500">Hello, world!</h1>,
            },
            {
                path: "/about",
                element: <h1>About</h1>,
            },
        ],
    },
]);

const AllRoutes: FC = () => {
    return <RouterProvider router={router} />;
};

export default AllRoutes;

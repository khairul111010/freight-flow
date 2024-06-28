import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layouts/Header";

const Layout: FC = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;

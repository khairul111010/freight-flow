import React, { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideBar from "../sidebar";
import { useLazyAutoLoginQuery } from "../../store/apis/authApi";
import { authEnum } from "../../enums/authEnums";

const Layout: FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [autoLogin] = useLazyAutoLoginQuery();
    const accessToken = localStorage.getItem(authEnum.LOCAL_STORAGE_TOKEN_KEY);
    useEffect(() => {
        if (accessToken) {
            autoLogin();
        }
    }, []);
    return (
        <div className="transition-all duration-150 ease-in text-[14px] min-h-screen bg-[#F3F4F6] lg:pl-[250px] pt-[60px] flex flex-col">
            <SideBar
                open={sidebarOpen}
                onClose={(open) => setSidebarOpen(open)}
            />
            <Header open={sidebarOpen} setOpen={setSidebarOpen} />
            <div className="grow py-6 px-8">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import DotLoader from "../preloader/dot-loader";
import MainLoader from "../preloader/MainLoader";
import Footer from "./Footer";
const AuthLayout = () => {
    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="w-[500px] border rounded-lg p-9">
                    <img src={logo} alt="" />
                    <div className="font-bold text-xl text-center">Welcome</div>
                    <Outlet />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default AuthLayout;

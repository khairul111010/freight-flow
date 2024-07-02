import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { BaseState } from "../../store";
import { authEnum } from "../../enums/authEnums";
import { AuthRoutesEnum } from "../../enums/routeEnums";
import { setToken, setUser } from "../../store/slices/authSlice";

const AppLayout: FC = () => {
    const { user } = useSelector((state: BaseState) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const localAccessToken = localStorage.getItem(
        authEnum.LOCAL_STORAGE_TOKEN_KEY
    );

    useEffect(() => {
        if (!localAccessToken) {
            navigate(AuthRoutesEnum.LOGIN);
        } else {
            dispatch(setToken(localAccessToken));
            dispatch(setUser(user));
        }
    }, []);

    useEffect(() => {
        if (!user && !localAccessToken) {
            navigate(AuthRoutesEnum.LOGIN);
        }
    }, [user]);

    return (
        <>
            <Outlet />
        </>
    );
};

export default AppLayout;

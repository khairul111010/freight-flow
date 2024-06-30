import { IconChevronDown, IconLogout } from "@tabler/icons-react";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeToken, removeUser } from "../../store/slices/authSlice";
import Dropdown from "../dropdown";
import Button from "../button";
interface UserDropdownProps {
    className?: string;
}
const UserDropdown: FC<UserDropdownProps> = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: any) => state.auth);
    const handleLogout = () => {
        dispatch(removeToken());
        dispatch(removeUser());
        navigate("/login");
    };

    return (
        <Dropdown
            className={`${className} `}
            position="bottom-right"
            toggleWrapperClassName="h-full flex items-center"
            renderToggle={
                <div className="flex items-center gap-2 uppercase">
                    <div
                        className={`h-10 w-10 text-white bg-gray-400 font-bold rounded-full flex items-center justify-center`}
                    >
                        {user?.name[0]}
                    </div>
                    <div className="font-semibold text-base">
                        {user && user["name"]}
                    </div>
                    <IconChevronDown />
                </div>
            }
        >
            <div className="p-3 w-[200px] bg-slate-800 text-white border-none">
                <ul>
                    <li>
                        <Button
                            variant="transparent"
                            className="border-0 !px-2 py-1 h-auto flex items-center gap-2"
                            onClick={handleLogout}
                        >
                            <IconLogout />
                            <span>Logout</span>
                        </Button>
                    </li>
                </ul>
            </div>
        </Dropdown>
    );
};

export default UserDropdown;

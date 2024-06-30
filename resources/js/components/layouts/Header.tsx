import { FC, useState } from "react";
import { IconMenu } from "@tabler/icons-react";
import UserDropdown from "../header/UserDropdown";
type Props = {
    open?: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const Header: FC<Props> = ({ setOpen, open }) => {
    return (
        <div
            className={`transition-all duration-150 ease-in h-[70px] fixed top-0 right-0 lg:w-[calc(100%-250px)] w-full px-5 flex justify-between items-center z-[20] bg-white`}
        >
            <div className="grow max-w-[800px] relative">
                <button
                    className="h-8 w-8 lg:hidden flex items-center justify-center text-xl"
                    type="button"
                    onClick={() => setOpen(!open)}
                >
                    <IconMenu size={20} />
                </button>
            </div>
            <div className="flex items-center gap-6">
                <UserDropdown className="" />
            </div>
        </div>
    );
};

export default Header;

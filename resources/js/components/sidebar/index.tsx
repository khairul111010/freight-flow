import MetisMenu from "@metismenu/react";
import { FC } from "react";
import MenuItem from "./MenuItem";
import { IconX } from "@tabler/icons-react";
import logo from "../../assets/logo.png";
type Props = {
    open?: boolean;
    onClose?: (open: boolean) => void;
};

const SideBar: FC<Props> = ({ open, onClose }) => {
    return (
        <>
            <div
                className={`transition-all duration-150 ease-in bg-white h-screen fixed z-[22] left-0 ${
                    open
                        ? "lg:translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }   top-0 bottom-0 w-[250px] border-r`}
            >
                <div className="h-screen overflow-y-auto scrollbar  min-h-screen">
                    <div className="px-5 pt-[20px] flex items-center relative">
                        <div className="flex items-center flex-col pl-3 gap-3 ">
                            <img src={logo} alt="" className="w-40" />
                        </div>
                        <button
                            className="h-8 w-8 absolute right-2 lg:hidden flex items-center justify-center text-xl"
                            type="button"
                            onClick={() => onClose?.(false)}
                        >
                            <IconX className="bg-slate-200 rounded-full p-1" />
                        </button>
                    </div>
                    <div className="px-4 py-4">hello</div>
                </div>
            </div>
            <div
                className={`fixed top-0 left-0 h-screen w-screen md:hidden bg-black/50 z-[21] ${
                    open ? "block" : "hidden"
                }`}
                onClick={() => onClose?.(false)}
            ></div>
        </>
    );
};
export default SideBar;

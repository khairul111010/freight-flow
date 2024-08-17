import { IconSquareX } from "@tabler/icons-react";
import { FC, ReactNode } from "react";

type Props = {
    open: boolean;
    onClose?: () => void;
    children: ReactNode;
    title?: string;
};
const Modal: FC<Props> = ({ open, onClose, title, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-30">
            <div className="bg-white rounded-md text-black min-w-[400px] md:min-w-[540px] max-h-[80vh] overflow-y-auto">
                <div className="py-3 px-6 border-b flex items-center justify-between">
                    <div className="text-2xl font-semibold text-[#1F2937]">
                        {title}
                    </div>
                    <IconSquareX onClick={onClose} />
                    {/* <img
                        src="/cancel.svg"
                        alt=""
                        className="w-8 h-8 cursor-pointer bg-slate-100 hover:bg-slate-300 transition-all duration-150 ease-in rounded-full"
                        onClick={onClose}
                    /> */}
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};

export default Modal;

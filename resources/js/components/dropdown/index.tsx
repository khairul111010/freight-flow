import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

type DropdownProps = {
    className?: string;
    toggleWrapperClassName?: string;
    children?: ReactNode;
    renderToggle: ReactNode;
    position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
    closeOnRouteChange?: boolean;
};

const Dropdown: FC<DropdownProps> = ({
    className = "",
    toggleWrapperClassName = "",
    renderToggle,
    children,
    position = "bottom-left",
    closeOnRouteChange = true,
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const location = useLocation();

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Close the dropdown when the location changes if closeOnRouteChange is true
        if (closeOnRouteChange) {
            setIsOpen(false);
        }
    }, [location, closeOnRouteChange]);

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            <div
                className={`cursor-pointer ${toggleWrapperClassName}`}
                onClick={handleToggle}
            >
                {renderToggle}
            </div>
            {
                <div
                    className={` transition-all absolute border-gray-100 bg-white rounded-md shadow-lg overflow-hidden z-[20] ${
                        isOpen
                            ? "visible opacity-1 translate-y-[0px]"
                            : "invisible opacity-0 translate-y-[-10px]"
                    } ${
                        position === "bottom-left" || position === "top-left"
                            ? "left-0"
                            : "right-0"
                    } ${
                        position === "bottom-left" ||
                        position === "bottom-right"
                            ? "top-full"
                            : "bottom-full"
                    }`}
                >
                    {children}
                </div>
            }
        </div>
    );
};

export default Dropdown;

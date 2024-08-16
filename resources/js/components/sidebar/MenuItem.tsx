import { FC, useEffect, useRef, useState } from "react";
import { NavLink, matchPath, useLocation, useParams } from "react-router-dom";

export type MenuItemType = {
    name: string;
    path: string;
    icon?: any;
    subMenu?: MenuItemType[];
    additionalChildRoutes?: string[];
    requiredPermissions?: string[];
};

interface Props {
    className?: string;
    item: MenuItemType;
}

const MenuItem: FC<Props> = ({ className = "", item }) => {
    const menuItemRef = useRef<HTMLLIElement>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    let { "*": slug } = useParams();
    const { pathname } = useLocation();

    useEffect(() => {
        if (
            item.subMenu &&
            item.subMenu.filter((_item) => {
                return (
                    pathname?.includes(_item.path as string) ||
                    (item.additionalChildRoutes?.filter(
                        (route) =>
                            route.includes(pathname as string) ||
                            matchPath(route, pathname)
                    )?.length as number) > 0
                );
            }).length > 0
        ) {
            setDropdownOpen(true);
        } else if (
            item.subMenu ||
            menuItemRef.current?.classList.contains("mm-active")
        ) {
            setDropdownOpen(false);
            menuItemRef.current?.classList.remove("mm-active");
            if (menuItemRef.current?.firstChild) {
                // @ts-ignore
                menuItemRef.current?.firstChild?.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }
    }, [pathname]);

    return (
        <li ref={menuItemRef} className="relative">
            {item.subMenu ? (
                <NavLink
                    to="#"
                    className={
                        "font-medium hover:text-white has-arrow text-[#9CA3AF] text-base flex items-center gap-3 px-4 py-3 rounded-[4px] hover:bg-[#2A2D32]"
                    }
                >
                    {item.icon && (
                        <item.icon className="h-5 w-5 hover:!text-white" />
                    )}
                    <span className="leading-none hover:!text-white">
                        {item.name}
                    </span>
                </NavLink>
            ) : (
                <NavLink
                    to={item.path}
                    className={({ isActive }) => {
                        return `${className} font-medium text-base flex items-center gap-2 px-4 py-3 my-2 rounded-[4px] ${
                            isActive
                                ? "bg-gray-100 hover:bg-gray-100 font-semibold focus:no-underline before:left-0 before:absolute before:h-9 before:w-1 before:bg-primary before:rounded-full"
                                : "bg-gray-50 hover:bg-gray-100 text-gray-900"
                        }`;
                    }}
                >
                    {item.icon && (
                        <span className="pl-2">
                            <item.icon className="h-5 w-5" />
                        </span>
                    )}
                    <span className="leading-none ">{item.name}</span>
                </NavLink>
            )}

            {item.subMenu && (
                <ul
                    className={`ml-8 ${
                        dropdownOpen ? "mm-show" : "mm-collapse"
                    }`}
                >
                    {item.subMenu.map((_item: any, index: number) => {
                        return <MenuItem item={_item} key={index} />;
                    })}
                </ul>
            )}
        </li>
    );
};

export default MenuItem;

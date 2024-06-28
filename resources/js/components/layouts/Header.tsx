import { FC } from "react";
import { Link } from "react-router-dom";
import { AppRoutesEnum } from "../../enums/routeEnums";

const Header: FC = () => {
    return (
        <header className="flex items-center gap-2.5">
            <Link to={AppRoutesEnum.DASHBOARD} className="font-bold">
                Home
            </Link>
        </header>
    );
};

export default Header;

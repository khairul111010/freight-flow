import { FC } from "react";
import {Link} from "react-router-dom";

const Header:FC = () => {
    return (
        <header className="flex items-center gap-2.5">
            <Link to={'/'} className="font-bold">Home</Link>
            <Link to={'/about'}>About US</Link>
        </header>
    )
}

export default Header;

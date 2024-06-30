import React from "react";

const Footer = () => {
    return (
        <div className="p-4 flex justify-center text-sm opacity-60">
            &copy; {new Date().getFullYear()}. All rights reserved by{" "}
            <a
                className="underline ml-1"
                target="_blank"
                href="https://creambeans.netlify.app/"
            >
                Creambeans
            </a>
        </div>
    );
};

export default Footer;

import { ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import Spinner from "../preloader/Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    to?: string;
    variant?:
        | "primary"
        | "primary-light"
        | "secondary"
        | "tertiary"
        | "link"
        | "transparent";
    size?: "small" | "medium" | "large" | "xLarge";
    type?: "button" | "submit" | "reset";
    loading?: boolean;
}

const Button = ({
    className = "",
    children,
    to,
    size = "medium",
    variant = "primary",
    type = "button",
    loading = false,
    ...props
}: ButtonProps) => {
    const sizeClass = {
        small: "text-xs px-3 h-[32px] rounded-[2px]",
        medium: "px-8 h-[48px] rounded-[2px]",
        large: "text-lg px-6 h-[56px] rounded-[2px]",
        xLarge: "text-xl px-8 h-[72px] rounded-[2px]",
    }[size];

    const variantClass = {
        primary: "border-primary text-white hover:bg-primary/90",
        "primary-light":
            "border-primary/10 text-primary hover:bg-primary/20 active:hover:bg-primary/20",
        secondary:
            "border-secondary hover:bg-secondary/90 active:hover:bg-secondary-dark",
        tertiary:
            "border-tertiary !text-white hover:bg-tertiary/90 active:hover:bg-tertiary-dark",
        link: "border-transparent hover:text-primary active:hover:text-primary-dark",
        transparent: "",
    }[variant];

    const bgClass = {
        primary: "bg-primary",
        "primary-light": "bg-primary/10",
        secondary: "bg-secondary",
        tertiary: "bg-tertiary",
        link: "",
        transparent: "",
    }[variant];

    return (
        <>
            {to && !props.disabled ? (
                <Link
                    to={to}
                    className={`${bgClass} ${sizeClass} ${variantClass} ${className} overflow-hidden relative flex items-center justify-center leading-[1.5] transition-all`}
                >
                    {loading && (
                        <span
                            className={`${bgClass} absolute w-full h-full flex items-center justify-center`}
                        >
                            <Spinner />
                        </span>
                    )}
                    {children}
                </Link>
            ) : (
                <button
                    className={`${bgClass} ${sizeClass} ${variantClass} ${className} border overflow-hidden relative inline-flex items-center justify-center leading-[1.5] transition-all`}
                    type={type}
                    {...props}
                >
                    {loading && (
                        <span
                            className={`${bgClass} absolute w-full h-full flex items-center justify-center`}
                        >
                            <Spinner />
                        </span>
                    )}
                    {children}
                </button>
            )}
        </>
    );
};

export default Button;

import { IconSearch } from "@tabler/icons-react";
import { CSSProperties, FC, InputHTMLAttributes } from "react";
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    labelStyle?: string | CSSProperties;
    containerStyle?: string | CSSProperties;
    size?: "small" | "medium" | "large" | "xlarge";
}

const SearchInput: FC<Props> = ({
    className = "",
    size = "medium",
    containerStyle,
    labelStyle,
    ...rest
}) => {
    const sizeClass = {
        small: "text-xs px-3 h-[32px] rounded",
        medium: "text-base px-4 h-[40px] rounded-md",
        large: "text-lg px-6 h-[56px] rounded-lg",
        xlarge: "text-xl px-8 h-[72px] rounded-xl",
    }[size];

    return (
        <div
            className={`relative flex align-center ${
                typeof containerStyle === "string" && containerStyle
            }`}
            style={
                (typeof containerStyle === "object" && containerStyle) ||
                undefined
            }
        >
            <input
                className={`leading-[1.5] text-sm pr-6 w-full block outline-none border-2 border-gray-200 focus:border-primary ${sizeClass} ${className} pl-8`}
                {...rest}
            />
            <div className="absolute top-[10px] left-2">
                <IconSearch className={`text-gray-400`} size={20} />
            </div>
        </div>
    );
};

export default SearchInput;

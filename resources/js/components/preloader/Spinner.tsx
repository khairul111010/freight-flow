import { IconLoader } from "@tabler/icons-react";
import { FC } from "react";

interface SpinnerProps {
    className?: string;
    size?: number;
    color?: string;
}

const Spinner: FC<SpinnerProps> = ({
    className = "",
    color = "white",
    size = 20,
}) => {
    return (
        <IconLoader
            size={size}
            className={`${className} animate-spin`}
            color={color}
        />
    );
};

export default Spinner;

import { IconChevronLeft } from "@tabler/icons-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
    message?: string;
    to?: string;
}

const BackButton: FC<Props> = ({ message = "Back", to }) => {
    const navigate = useNavigate();
    return (
        <button
            className={`flex items-center gap-1 w-fit py-2 border bg-white text-primary rounded-md border-primary px-3`}
            onClick={() => {
                to ? navigate(to) : navigate(-1);
            }}
        >
            <IconChevronLeft />
            {message}
        </button>
    );
};

export default BackButton;

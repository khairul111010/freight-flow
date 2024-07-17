import {
    IconAlertCircleFilled,
    IconFile,
    IconTrash,
} from "@tabler/icons-react";
import { FC, InputHTMLAttributes, useEffect, useRef, useState } from "react";

import { formatSize } from "../../../utils/file/helpers";
interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
    label?: string;
    labelStyle?: string | React.CSSProperties;
    containerStyle?: string | React.CSSProperties;
    size?: "small" | "medium" | "large" | "xlarge";
    validationError?: string;
    showOptionalLabel?: boolean;
    oldFiles?: any[];
    onOldFilesChange?: (files: number[]) => void;
    onFileChange?: (files: File[]) => void;
}

const FileInput: FC<Props> = ({
    label,
    className = "",
    size = "medium",
    containerStyle,
    labelStyle,
    validationError,
    onFileChange,
    oldFiles,
    onOldFilesChange,
    showOptionalLabel = false,
    ...rest
}) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [prevFiles, setPrevFiles] = useState<any>([]);

    // to handle the old files to be removed, it needs to be in state
    useEffect(() => {
        if (oldFiles) {
            setPrevFiles(oldFiles);
        }
    }, [oldFiles]);

    const sizeClass = {
        small: "text-xs px-3 h-[32px] rounded",
        medium: "text-base px-4 h-[42px] rounded-[10px]",
        large: "text-lg px-6 h-[56px] rounded-lg",
        xlarge: "text-xl px-8 h-[72px] rounded-xl",
    }[size];

    const handleAttachmentClick = (
        e: React.FormEvent<HTMLFormElement | HTMLButtonElement>
    ) => {
        e.preventDefault();
        fileInput?.current?.click();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files === null) return;
        else if (rest.multiple) {
            const newFiles = [...files, ...Array.from(e.target.files || [])];
            onFileChange && onFileChange(Array.from(newFiles));
            setFiles(newFiles);
        } else {
            onFileChange && onFileChange(Array.from(e.target.files));
            setFiles(Array.from(e.target.files || []));
            setPrevFiles([]);
            onOldFilesChange && onOldFilesChange([]);
        }
    };

    const handleRemoveFile = (index: number) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
        onFileChange && onFileChange(Array.from(newFiles));
    };

    // remove old files from state and passing the id that needs to be saved
    const handleRemoveOldFiles = (removeId: number) => {
        const updatedFiles = prevFiles.filter(
            (file: any) => file.id !== removeId
        );
        setPrevFiles(updatedFiles);
        onOldFilesChange && onOldFilesChange(updatedFiles);
    };

    return (
        <div
            className={`mb-3 text-gray-500 ${
                typeof containerStyle === "string" && containerStyle
            }`}
            style={
                (typeof containerStyle === "object" && containerStyle) ||
                undefined
            }
        >
            {label && (
                <label
                    className={`inline-block mb-1 text-[#3E3E3E] text-base font-normal ${
                        typeof labelStyle === "string" && labelStyle
                    }`}
                    style={
                        (typeof labelStyle === "object" && labelStyle) ||
                        undefined
                    }
                >
                    {label}
                    {showOptionalLabel && (
                        <span className="text-gray-400"> (Optional)</span>
                    )}
                </label>
            )}

            <div>
                <input
                    className="hidden opacity-0"
                    type="file"
                    accept=".png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, .xlsx, .csv"
                    ref={fileInput}
                    onChange={handleInputChange}
                    {...rest}
                />
                <button
                    type="button"
                    className="p-4 rounded-lg border-2 border-dotted pointer w-full flex flex-col items-center font-medium text-base text-[#374151]"
                    onClick={handleAttachmentClick}
                >
                    <div>
                        <img src={"/filePlus.svg"} alt="" />
                    </div>
                    <div>
                        Drag and drop or{" "}
                        <span className="text-blue-500 underline">
                            Upload a file
                        </span>
                    </div>
                </button>
            </div>
            <div className="mt-2 divide-y gap-y-2">
                {files.length > 0 &&
                    files.map((file, index) => (
                        <div key={index} className="flex items-center py-2">
                            <IconFile className="mr-3 text-[30px] text-gray-500" />
                            <div className="grow">
                                <div className="text-sm">{file.name}</div>
                                <div className="text-[11px] text-gray-500">
                                    ({formatSize(file.size)})
                                </div>
                            </div>
                            <button
                                className="ml-auto"
                                type="button"
                                onClick={() => handleRemoveFile(index)}
                            >
                                <IconTrash />
                            </button>
                        </div>
                    ))}
                {prevFiles.map((file: any, index: number) => (
                    <div key={index} className="flex items-center py-2">
                        <IconFile className="mr-3 text-[30px] text-gray-500" />
                        <div className="grow">
                            <div className="text-sm">{file?.name}</div>
                            <div className="text-[11px] text-gray-500">
                                ({formatSize(file?.size)})
                            </div>
                        </div>
                        <button
                            className="ml-auto"
                            type="button"
                            onClick={() => handleRemoveOldFiles(file?.id)}
                        >
                            <IconTrash />
                        </button>
                    </div>
                ))}
            </div>

            {validationError && (
                <div className="text-sm font-medium text-red-500 mt-1 flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        <div>
                            <IconAlertCircleFilled size={18} />
                        </div>
                        <div>{validationError}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default FileInput;

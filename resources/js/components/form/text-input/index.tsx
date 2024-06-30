import { IconAlertCircleFilled } from "@tabler/icons-react";
import { useField } from "formik";
import {
    CSSProperties,
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    ReactNode,
} from "react";
interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
    name: string;
    label?: string | ReactNode;
    labelStyle?: string | CSSProperties;
    containerStyle?: string | CSSProperties;
    size?: "small" | "medium" | "large" | "xLarge";
    showOptionalLabel?: boolean;
    validationError?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    noBorder?: boolean;
    helperMessage?: string | ReactNode;
}

const TextInput: FC<Props> = ({
    name,
    label,
    className = "",
    size = "medium",
    showOptionalLabel = false,
    containerStyle,
    labelStyle,
    validationError,
    onChange,
    noBorder = false,
    helperMessage,
    ...rest
}) => {
    const sizeClass = {
        small: "text-xs px-3 h-[32px] rounded-[2px]",
        medium: "text-sm px-4 h-[40px] rounded-[2px]",
        large: "text-base px-6 h-[56px] rounded-[2px]",
        xLarge: "text-lg px-8 h-[72px] rounded-[2px]",
    }[size];

    const [field, meta, helpers] = useField(name || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        field.onChange({ target: { name, value: e.target.value } });
        onChange && onChange(e);
    };

    return (
        <div
            className={`mb-4 ${
                typeof containerStyle === "string" && containerStyle
            }`}
            style={
                (typeof containerStyle === "object" && containerStyle) ||
                undefined
            }
        >
            {label && (
                <label
                    className={`text-base font-normal inline-block mb-[6px] text-[#374151] ${
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
            <input
                className={`leading-[1.5] rounded-md font-medium text-base w-full block outline-none ${
                    noBorder
                        ? ""
                        : `border-[2px] ${
                              meta.touched && meta.error
                                  ? "border-red-500 focus:border-red-500"
                                  : "focus:border-primary"
                          }`
                }  placeholder:text-gray-300 ${sizeClass} ${className}`}
                onChange={handleChange}
                name={name}
                value={rest.value || field.value}
                {...rest}
            />
            {helperMessage &&
                (typeof helperMessage === "string" ? (
                    <div className="text-sm text-gray-500">{helperMessage}</div>
                ) : (
                    helperMessage
                ))}
            {meta.touched && meta.error && (
                <div className="text-sm font-medium text-red-500 mt-1 flex items-center gap-1">
                    <div className="flex items-center gap-1">
                        <div>
                            <IconAlertCircleFilled size={18} />
                        </div>
                        <div>{meta.error}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TextInput;

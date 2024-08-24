import { useField } from "formik";
import {
    Calendar,
    CalendarPassThroughMethodOptions,
} from "primereact/calendar";
import { CSSProperties, FC, SyntheticEvent, useState } from "react";

import { Nullable } from "primereact/ts-helpers";
import { classNames } from "primereact/utils";
import {
    convertToDateObject,
    convertToDateYYMMDD,
} from "../../../utils/date/date";
import { IconAlertCircleFilled } from "@tabler/icons-react";

type Props = {
    name?: string;
    label?: string;
    value?: Date | null;
    labelStyle?: string | CSSProperties;
    containerStyle?: string | CSSProperties;
    size?: "small" | "medium" | "large" | "xlarge";
    showOptionalLabel?: boolean;
    disabled?: boolean;
    shouldDisableDate?: (date: any) => boolean;
    onChange?: (value: Date | null, e: SyntheticEvent<Element, Event>) => void;
};

const DateInput: FC<Props> = ({
    name,
    label,
    value,
    labelStyle,
    size = "medium",
    containerStyle,
    showOptionalLabel,
    disabled,
    shouldDisableDate,
    onChange,
    // ...rest
}) => {
    const [dateValue, setDateValue] = useState<Nullable<Date>>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = useField(name || "");

    const handleDateChange = ({ value, originalEvent }: any) => {
        const data = value ? convertToDateYYMMDD(value as string) : null;
        helpers && helpers.setValue(data);
        const dateObj: any = data ? convertToDateObject(data) : null;
        setDateValue(dateObj);
        onChange && onChange(dateObj, originalEvent);
    };

    return (
        <div
            className={`mb-4 c-date-input ${
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

            <Calendar
                disabled={disabled}
                showIcon
                value={
                    field?.value ? convertToDateObject(field?.value) : dateValue
                }
                onChange={handleDateChange}
                hourFormat="12"
                dateFormat="yy-mm-dd"
                pt={{
                    root: (options: any) => {
                        return {
                            className: classNames("w-full !bg-white", {}),
                        };
                    },
                    input: {
                        root: () => ({
                            className: classNames(
                                `bg-white h-[40px] ${
                                    meta &&
                                    meta.error &&
                                    meta.touched &&
                                    "border-red-500 focus:border-red-500"
                                } border-2 border-gray-200 rounded-[6px] focus:border-primary`,
                                {
                                    "px-4 font-medium text-sm": true,
                                }
                            ),
                        }),
                    },
                    dropdownButton: {
                        root: ({ props }: any) => ({
                            className: classNames({
                                "border-gray-200 border hidden bg-white shadow-none":
                                    props.icon,
                            }),
                        }),
                    },
                    panel: ({ props }: any) => ({
                        className: classNames("", {
                            "": !props.inline,
                            "!bg-white border-none shadow-md": props.inline,
                        }),
                    }),
                    header: {
                        className: "bg-white",
                    },
                    title: {
                        className: "text-sm p-4 bg-white",
                    },
                    monthTitle: {
                        className: "font-normal",
                    },
                    nextIcon: {
                        className: "h-[14px] w-[14px] mr-4",
                    },
                    previousIcon: {
                        className: "h-[14px] w-[14px] ml-4",
                    },
                    day: {
                        className: "text-sm bg-white p-2",
                    },
                    tableHeader: {
                        className: "!bg-white",
                    },
                    yearPicker: {
                        className: "!bg-white",
                    },
                    monthPicker: {
                        className: "!bg-white",
                    },
                    weekDay: {
                        className: "bg-white",
                    },
                    dayLabel: ({
                        context,
                    }: CalendarPassThroughMethodOptions) => {
                        return {
                            className: classNames(
                                "w-[26px] h-[26px] rounded-full",
                                {
                                    "bg-primary": context.selected,
                                    "text-white": context.selected,
                                }
                            ),
                        };
                    },
                    tableHeaderCell: {
                        className:
                            "!p-1 font-regular text-[12px] !text-primary",
                    },
                    incrementButton: {
                        className: "h-[20px] w-[24px]",
                    },
                    decrementButton: {
                        className: "h-[20px] w-[24px]",
                    },
                    ampm: {
                        className: "text-[12px]",
                    },
                    minute: {
                        className: "text-[12px]",
                    },
                    hour: {
                        className: "text-[12px]",
                    },
                    timePicker: {
                        className: "p-1",
                    },
                }}
            />
            {meta && meta.error && meta.touched && (
                <div className="text-sm font-normal text-red-500 mt-1 flex items-center gap-1">
                    <div>
                        <IconAlertCircleFilled size={18} />
                    </div>
                    <div>{meta.error}</div>
                </div>
            )}
        </div>
    );
};

export default DateInput;

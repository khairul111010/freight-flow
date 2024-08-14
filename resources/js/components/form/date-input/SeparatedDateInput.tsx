import {
    Calendar,
    CalendarPassThroughMethodOptions,
} from "primereact/calendar";
import { classNames } from "primereact/utils";
import { FC } from "react";

type Props = {
    onChange: (date: Date) => any;
    value: Date;
};
const SeparatedDateInput: FC<Props> = ({ onChange, value }) => {
    return (
        <Calendar
            value={value}
            onChange={(e: any) => onChange(e.value)}
            view="month"
            dateFormat="mm/yy"
            pt={{
                root: (options: any) => {
                    return {
                        className: classNames("w-full !bg-white", {}),
                    };
                },
                input: {
                    root: () => ({
                        className: classNames(
                            `bg-white h-[40px] border-2 border-gray-200 rounded-[6px] focus:border-primary`,
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
                month: {
                    className: "text-sm bg-white p-2",
                },
                dayLabel: ({ context }: CalendarPassThroughMethodOptions) => {
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
                    className: "!p-1 font-regular text-[12px] !text-primary",
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
    );
};

export default SeparatedDateInput;

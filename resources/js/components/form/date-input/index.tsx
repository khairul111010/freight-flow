import {useField} from 'formik'
import {Calendar, CalendarPassThroughMethodOptions} from 'primereact/calendar'
import {CSSProperties, FC, SyntheticEvent, useState} from 'react'

// import {getDateObject, getTimestamp} from 'utils/dateFormat'
import {getDateObject, getTimestamp} from '@/utils/date'
import {Nullable} from 'primereact/ts-helpers'
import {classNames} from 'primereact/utils'
import './styles.scss'
import WarningIcon from '/circle-exclamation.svg'
type Props = {
    name?: string
    label?: string
    value?: Date | null
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    showOptionalLabel?: boolean
    disabled?: boolean
    shouldDisableDate?: (date: any) => boolean
    onChange?: (value: Date | null, e: SyntheticEvent<Element, Event>) => void
}

const DateInput: FC<Props> = ({
    name,
    label,
    value,
    labelStyle,
    size = 'medium',
    containerStyle,
    showOptionalLabel,
    disabled,
    shouldDisableDate,
    onChange,
    // ...rest
}) => {
    const [dateValue, setDateValue] = useState<Nullable<Date>>(null)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = name ? useField(name || '') : [null, null, null]

    const handleDateChange = ({value, originalEvent}: any) => {
        const data = value ? getTimestamp(value as string) : null
        helpers && helpers.setValue(data)
        const dateObj: any = data ? getDateObject(data) : null
        setDateValue(dateObj)
        onChange && onChange(dateObj, originalEvent)
    }

    return (
        <div
            className={`mb-4 c-date-input ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            {label && (
                <label
                    className={`block mb-3 text-base font-normal leading-none text-[#3E3E3E] ${
                        typeof labelStyle === 'string' && labelStyle
                    }`}
                    style={(typeof labelStyle === 'object' && labelStyle) || undefined}
                >
                    {label}
                    {showOptionalLabel && <span className='text-gray-400'> (Optional)</span>}
                </label>
            )}

            <Calendar
                // ref={calenderRef}
                // showTime={showTime}
                disabled={disabled}
                showIcon
                value={field?.value ? getDateObject(field?.value) : dateValue}
                onChange={handleDateChange}
                hourFormat='12'
                dateFormat='dd/mm/yy'
                pt={{
                    root: (options: any) => {
                        return {
                            className: classNames('w-full', {}),
                        }
                    },
                    input: {
                        root: () => ({
                            className: classNames(
                                `bg-dark-900 h-[40px] text-black placeholder:text-dark-400 border-t-2 border-l-2 border-b-2 rounded-md border-[#DFDFDF] shadow-none ${
                                    meta &&
                                    meta.error &&
                                    meta.touched &&
                                    'bg-secondary/5 border-secondary'
                                } focus:border-primary rounded-r-[2px] sm:text-sm sm:leading-6`,
                                {
                                    'px-4 text-base': true,
                                }
                            ),
                        }),
                    },
                    dropdownButton: {
                        root: ({props}: any) => ({
                            className: classNames({
                                'border-[#DFDFDF] border-2 bg-[#F4F4F4] shadow-none': props.icon,
                            }),
                        }),
                    },
                    panel: ({props}: any) => ({
                        className: classNames('', {
                            '': !props.inline,
                            '!w-[270px] bg-dark-800 border-none shadow-md': props.inline,
                        }),
                    }),
                    header: {
                        className: 'bg-dark-700 text-dark-100',
                    },
                    title: {
                        className: 'text-[14px]',
                    },
                    monthTitle: {
                        className: 'font-normal',
                    },
                    nextIcon: {
                        className: 'h-[10px] w-[10px]',
                    },
                    previousIcon: {
                        className: 'h-[10px] w-[10px]',
                    },
                    day: {
                        className: 'text-[12px] p-1',
                    },
                    dayLabel: ({context}: CalendarPassThroughMethodOptions) => {
                        return {
                            className: classNames('w-[26px] h-[26px]', {
                                'bg-primary': context.selected,
                                'text-white': context.selected,
                            }),
                        }
                    },
                    tableHeaderCell: {
                        className: '!p-1 font-regular text-[12px] text-secondary !text-primary',
                    },
                    incrementIcon: {
                        className: 'h-[10px] w-[10px]',
                    },
                    decrementIcon: {
                        className: 'h-[10px] w-[10px]',
                    },
                    incrementButton: {
                        className: 'h-[20px] w-[24px]',
                    },
                    decrementButton: {
                        className: 'h-[20px] w-[24px]',
                    },
                    ampm: {
                        className: 'text-[12px]',
                    },
                    minute: {
                        className: 'text-[12px]',
                    },
                    hour: {
                        className: 'text-[12px]',
                    },
                    timePicker: {
                        className: 'p-1',
                    },
                }}
            />
            {meta && meta.error && meta.touched && (
                <div className='text-sm font-normal text-red-500 mt-1 flex items-center gap-1'>
                    <img src={WarningIcon} alt='' />
                    <div>{meta.error}</div>
                </div>
            )}
        </div>
    )
}

export default DateInput

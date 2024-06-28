import {useField} from 'formik'
import {CSSProperties, FC, InputHTMLAttributes, ReactNode} from 'react'
import Select, {ActionMeta, SingleValue, components} from 'react-select'
import WarningIcon from '/circle-exclamation.svg'
type Option = {
    label: string
    value: string | number
}

interface Props extends Omit<InputHTMLAttributes<HTMLSelectElement>, 'size' | 'onChange'> {
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    isSearchable?: boolean
    showOptionalLabel?: boolean
    isRtl?: boolean
    isClearable?: boolean
    isLoading?: boolean
    options: Option[]
    onChange?: (value: Option | null) => void
    noBorder?: boolean
    disabled?: boolean
    error?: string
    value?: string | number
    menuFooter?: ReactNode
}

const SelectInput: FC<Props> = ({
    label,
    className = '',
    size = 'medium',
    isSearchable = true,
    showOptionalLabel = false,
    isRtl = false,
    isClearable = false,
    containerStyle,
    labelStyle,
    isLoading = false,
    options,
    name,
    onChange,
    noBorder = false,
    disabled = false,
    error,
    value,
    menuFooter,
    ...rest
}) => {
    const sizeClass = {
        small: `text-xs px-3 h-[32px] !shadow-none ${
            noBorder ? '!border-none ' : 'border-gray-300 !rounded-[2px]'
        }`,
        medium: `text-sm pl-[calc(1rem-8px)] h-[42px] !shadow-none ${
            noBorder ? '!border-none ' : '!border-2 !border-[#DFDFDF] !rounded-[6px]'
        }`,
        large: `text-lg px-6 h-[56px] !shadow-none ${
            noBorder ? '!border-none ' : 'border-gray-300 !rounded-[2px]'
        }`,
        xlarge: `text-xl px-8 h-[72px] !shadow-none ${
            noBorder ? '!border-none ' : 'border-gray-300 !rounded-[2px]'
        }`,
    }[size]

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [field, meta, helpers] = name ? useField(name || '') : [null, null, null]

    const handleOnChange = (option: SingleValue<Option>, actionMeta: ActionMeta<Option>) => {
        field && field.onChange({target: {name, value: option?.value}})
        onChange && onChange(option)
    }

    return (
        <div
            className={`mb-4 ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            {label && (
                <label
                    className={`inline-block font-normal text-base mb-1 text-[#3E3E3E] ${
                        typeof labelStyle === 'string' && labelStyle
                    }`}
                    style={(typeof labelStyle === 'object' && labelStyle) || undefined}
                >
                    {label}
                    {showOptionalLabel && <span className='text-gray-400'> (Optional)</span>}
                </label>
            )}
            <Select
                defaultValue={options.find((option) => option.value === value)}
                value={options.find((option) => option.value === field?.value)}
                menuPlacement='auto'
                options={options}
                classNames={{
                    control: ({isFocused}) => {
                        return (
                            sizeClass +
                            (isFocused ? ' !border-primary' : '') +
                            (meta && meta.error && meta.touched
                                ? ' !border-secondary focus:!border-secondary !bg-secondary/5 !border-[2px] !rounded-md'
                                : '')
                        )
                    },
                    option: ({isSelected, isFocused}) => {
                        return isSelected ? '!bg-primary' : ''
                    },
                    indicatorSeparator: () => 'hidden',
                    placeholder: () => '!text-gray-300',
                    menuPortal: () => '!z-[1100] text-sm !bg-primary',
                }}
                components={{
                    MenuList: ({children, selectProps, ...rest}) => {
                        return (
                            <div className=''>
                                <components.MenuList {...rest} selectProps={selectProps}>
                                    {children}
                                </components.MenuList>
                                {menuFooter && menuFooter}
                            </div>
                        )
                    },
                }}
                isDisabled={disabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isRtl={isRtl}
                isSearchable={isSearchable}
                name={name}
                menuPosition='fixed'
                placeholder={rest.placeholder}
                onChange={handleOnChange}
                menuPortalTarget={document.body}
            />
            {meta && meta.error && meta.touched && (
                <div className='text-sm font-normal text-red-500 mt-1 flex items-center gap-1'>
                    <img src={WarningIcon} alt='' />
                    <div>{meta.error}</div>
                </div>
            )}
            {error ? <div className='text-sm text-red-500 mt-1'>{error}</div> : null}
        </div>
    )
}

export default SelectInput

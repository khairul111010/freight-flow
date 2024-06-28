import {useField} from 'formik'
import {CSSProperties, ChangeEvent, FC, InputHTMLAttributes, ReactNode} from 'react'
import WarningIcon from '/circle-exclamation.svg'
interface Props extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    name: string
    label?: string | ReactNode
    labelStyle?: string | CSSProperties
    containerStyle?: string | CSSProperties
    size?: 'small' | 'medium' | 'large' | 'xlarge'
    showOptionalLabel?: boolean
    rows?: number
    validationError?: string
}

const TextareaInput: FC<Props> = ({
    label,
    labelStyle,
    className = '',
    size = 'medium',
    containerStyle,
    showOptionalLabel,
    rows,
    ...rest
}) => {
    const sizeClass = {
        small: 'text-xs py-2 px-3 rounded-[8px]',
        medium: 'text-base py-2 px-4 rounded-[6px]',
        large: 'text-lg py-2 px-6 rounded-lg',
        xlarge: 'text-xl py-2 px-8 rounded-xl',
    }[size]

    const [field, meta, helpers] = useField(rest.name || '')

    const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        field.onChange({target: {name: rest.name, value: e.target.value}})
    }

    return (
        <div
            className={`mb-4 ${typeof containerStyle === 'string' && containerStyle}`}
            style={(typeof containerStyle === 'object' && containerStyle) || undefined}
        >
            {label && (
                <label
                    className={`inline-block mb-1 text-base font-normal text-[#3E3E3E] ${
                        typeof labelStyle === 'string' && labelStyle
                    }`}
                    style={(typeof labelStyle === 'object' && labelStyle) || undefined}
                >
                    {label}
                    {showOptionalLabel && <span className='text-gray-400'> (Optional)</span>}
                </label>
            )}
            <textarea
                className={`border-2 ${
                    meta && meta.error && meta.touched && 'bg-secondary/5 border-secondary'
                } leading-[1.5] font-medium text-base w-full block outline-none border-[#DFDFDF] placeholder:text-gray-300 focus:border-primary ${sizeClass} ${className}`}
                rows={rows || 3}
                onChange={handleOnChange}
                {...rest}
                value={rest.value || field.value}
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

export default TextareaInput

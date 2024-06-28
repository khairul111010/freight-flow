import {ReactNode, useEffect, useState} from 'react'
import {BiCheck, BiMinus} from 'react-icons/bi'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string | ReactNode
    isPartial?: boolean
    containerStyle?: string
}

const CheckboxInput = ({
    label = '',
    className = '',
    onChange,
    checked = false,
    containerStyle,
    isPartial = false,
    ...props
}: Props) => {
    const [isChecked, setIsChecked] = useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        setIsChecked(e.target.checked)
    }
    useEffect(() => {
        setIsChecked(checked as boolean)
    }, [checked])

    return (
        <>
            <label
                className={`select-none text-[14px] cursor-pointer flex items-center gap-3 ${
                    typeof containerStyle === 'string' && containerStyle
                }`}
                style={(typeof containerStyle === 'object' && containerStyle) || undefined}
            >
                <input
                    {...props}
                    type='checkbox'
                    className={`hidden ${className}`}
                    onChange={handleChange}
                    checked={isChecked}
                />

                <span
                    className={`border rounded h-4 w-4 flex items-center justify-center text-3xl relative ${
                        isChecked ? 'bg-primary border-none' : 'border-gray-300 bg-white'
                    }`}
                >
                    {isChecked ? (
                        <BiCheck className='text-white text-[16px]' />
                    ) : isPartial ? (
                        <BiMinus />
                    ) : null}
                </span>

                {label && <span>{label}</span>}
            </label>
        </>
    )
}

export default CheckboxInput

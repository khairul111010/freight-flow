import {useField} from 'formik'
import {ChangeEvent, FC, InputHTMLAttributes} from 'react'
import './style.scss'

interface RadioOption {
    label: string
    value: string
}

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    className?: string
    isMegaBox?: boolean
    options: RadioOption[]
}

const RadioInputGroup: FC<Props> = ({className, isMegaBox, options, name, ...rest}) => {
    const [field, meta, helpers] = useField(name || '')

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        field.onChange({target: {name, value}})
    }

    return (
        <div className={`flex flex-wrap text-center ${className}`}>
            <div className='flex flex-wrap text-center'>
                {options.map((option) => (
                    <div className='mb-4 mr-4' key={option.value}>
                        <label>
                            <input
                                type='radio'
                                value={option.value}
                                name={name}
                                checked={field.value === option.value}
                                onChange={handleRadioChange}
                                className='hidden'
                            />
                            <span
                                className={`flex cursor-pointer items-center ${
                                    isMegaBox
                                        ? 'px-4 py-2 border border-gray-300 rounded-lg dark:border-[#313336]'
                                        : ''
                                } ${
                                    field.value === option.value
                                        ? 'border-blue-500  dark:bg-[#1A1D24]'
                                        : ''
                                }`}
                            >
                                <span
                                    className={`mr-2 inline-block h-4 w-4 rounded-full border check ${
                                        field.value === option.value
                                            ? 'border-blue-500'
                                            : 'border-gray-300 dark:border-[#313336]'
                                    } `}
                                />
                                <span className='grow-1 min-w-0'>
                                    <span className='text'>{option.label}</span>
                                </span>
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RadioInputGroup

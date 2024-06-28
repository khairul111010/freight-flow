import {useField} from 'formik'
import {FC, useEffect, useState} from 'react'
import './switch-input.css'

interface Props {
    name: string
    label: string
    checked?: boolean
}

const SwitchInput: FC<Props> = ({name, checked, label}) => {
    const [field, meta, helpers] = useField(name || '')

    const [checkedValue, setCheckedValue] = useState(false)

    useEffect(() => {
        if (checked) {
            setCheckedValue(checked)
        }
    }, [checked])

    const handleSwitch = () => {
        const value = !checkedValue
        field.onChange({target: {name, value: value ? 1 : 0}})
        setCheckedValue(!checkedValue)
    }

    return (
        <label className='w-fit cursor-pointer'>
            <div className='mb-3 text-base font-normal inline-block text-[#374151]'>{label}</div>
            <div className='relative'>
                <input
                    name={name}
                    type='checkbox'
                    className='sr-only'
                    checked={checkedValue}
                    onChange={handleSwitch}
                />
                <div
                    className={`block ${
                        checkedValue ? 'bg-primary' : 'bg-[#d9d9d9]'
                    } w-10 h-6 rounded-full`}
                ></div>
                <div className='dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition'></div>
            </div>
        </label>
    )
}

export default SwitchInput

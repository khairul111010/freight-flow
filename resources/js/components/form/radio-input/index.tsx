import {FieldProps} from 'formik'
import React from 'react'

interface RadioInputProps {
    name: string
    label: string
    value: string
}

const RadioInput: React.FC<RadioInputProps & FieldProps> = ({
    field,
    form: {touched, errors},
    label,
    value,
    ...props
}) => {
    return (
        <div>
            <label>
                <input
                    type='radio'
                    {...field}
                    {...props}
                    value={value}
                    checked={field.value === value}
                />
                {label}
            </label>
        </div>
    )
}

export default RadioInput

import {useEffect, useState} from 'react'

const useDebounce = (value: string, delay: number = 500) => {
    const [data, setData] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setData(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return data
}

export default useDebounce

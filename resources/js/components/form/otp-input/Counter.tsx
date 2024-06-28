import Spinner from 'components/preloader/Spinner'
import {FC, useEffect, useState} from 'react'

type Props = {
    label: string
    actionLabel: string
    onAction?: () => Promise<any>
}

const OtpCounter: FC<Props> = ({label, actionLabel, onAction}) => {
    const countDown = 120
    const [actionLoading, setActionLoading] = useState<boolean>(false)
    const [counter, setCounter] = useState<number>(countDown)

    const handleOnAction = () => {
        setActionLoading(() => true)
        onAction &&
            onAction()
                .then()
                .finally(() => {
                    setCounter(countDown)
                    setActionLoading(() => false)
                })
    }

    useEffect(() => {
        // Decrease counter every second
        const timer = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1)
        }, 1000)

        // Clear the timer when the component unmounts or when the counter reaches 0
        return () => clearInterval(timer)
    }, [])

    return (
        <div className='text-center text-sm mb-4'>
            {counter > 0 ? (
                <div>
                    {label} {String(Math.floor(counter / 60)).padStart(2, '0')}:
                    {String(counter % 60).padStart(2, '0')}s
                </div>
            ) : actionLoading ? (
                <Spinner />
            ) : (
                <button className='underline' onClick={handleOnAction}>
                    {actionLabel}
                </button>
            )}
        </div>
    )
}

export default OtpCounter

import {FC} from 'react'
import DotLoader from './dot-loader'

const MainLoader: FC = () => {
    return (
        <div className='min-h-screen bg-[#F8F8FA] flex items-center justify-center'>
            <DotLoader />
        </div>
    )
}

export default MainLoader

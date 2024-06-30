import {FC} from 'react'

const DotLoader: FC = () => {
    return (
        <div className='inline-block relative w-[36px] h-[8px]'>
            <div className='absolute top-0 left-[0px] w-[8px] h-[8px] rounded-full bg-gray-500 animate-[dotEllipse1_.6s_infinite]'></div>
            <div className='absolute top-0 left-[0px] w-[8px] h-[8px] rounded-full bg-gray-500 animate-[dotEllipse2_.6s_infinite]'></div>
            <div className='absolute top-0 left-[14px] w-[8px] h-[8px] rounded-full bg-gray-500 animate-[dotEllipse2_.6s_infinite]'></div>
            <div className='absolute top-0 left-[28px] w-[8px] h-[8px] rounded-full bg-gray-500 animate-[dotEllipse3_.6s_infinite]'></div>
        </div>
    )
}

export default DotLoader

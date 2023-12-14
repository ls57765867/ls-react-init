import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

import type { FC } from 'react'
interface interfaceProps {
    default?: number
}
const Test: FC<interfaceProps> = (props) => {
    const [num, setNum] = useState(props.default || 1)
    // console.log(useLocation(), 1)
    // console.log(useParams(), 2)
    const handleClick = function () {
        setNum(num + 2)
    }
    return (
        <>
            <h1 className='text-blue'>{num}</h1>
            <button onClick={handleClick}>+++</button>
            <div className='w-[375px] bg-blue'>来了</div>
        </>
    )
}

export default Test

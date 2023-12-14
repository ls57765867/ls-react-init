import { editName, delayEditName, addApprove } from '@/store'
import { useSelector, useDispatch } from 'react-redux'

import type { StoreState } from '@/store/index'

const Toolkit = () => {
    const { approve, negative } = useSelector((state: StoreState) => state.vote)
    const { name } = useSelector((state: StoreState) => state.user)
    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(addApprove(10))
    }
    const randomName = () => {
        dispatch<any>(delayEditName())
    }
    return (
        <>
            <h1>赞成数量: {approve}</h1>
            <h1>反对数量: {negative}</h1>
            <h1>总票数: {approve + negative}</h1>
            <button onClick={handleClick}>增加反对</button>
            <input value={name} onChange={(e) => dispatch(editName(e.target.value))} />
            <h1>{name}</h1>
            <br />
            <button onClick={randomName}> 随机名</button>
        </>
    )
}

export default Toolkit

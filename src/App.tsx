import { BrowserRouter } from 'react-router-dom'
import { RouterView } from './router/index'
import { getTest } from '@/api'

import { useSelector, useDispatch } from 'react-redux'

import { editFullLoading, type StoreState } from '@/store/index'

const App = () => {
    const { fullscreenLoading } = useSelector((state: StoreState) => state.base)

    useEffect(() => {
        getTest().then((res) => {
            console.log(res, 333)
        })
    }, [])
    return (
        <BrowserRouter>
            <RouterView></RouterView>
            <Spin spinning={fullscreenLoading} fullscreen />
        </BrowserRouter>
    )
}

export default App

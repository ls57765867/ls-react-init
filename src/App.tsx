import { BrowserRouter, HashRouter } from 'react-router-dom'
import { RouterView } from './router/index'
const App = () => {
    return (
        <BrowserRouter>
            <RouterView></RouterView>
        </BrowserRouter>
    )
}

export default App

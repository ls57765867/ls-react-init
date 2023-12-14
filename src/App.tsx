import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Test from '@/components/Test'
import { useRoutes, Outlet, useNavigate, Link } from 'react-router-dom'
import Toolkit from './pages/toolkit'

function App() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/team', {
            state: {
                name: 'zs',
            },
        })
    }
    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo' />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs text-red-400'>Click on the Vite and React logos to learn more</p>
            <button onClick={handleNavigate}>跳转</button>
            <Link to='/team/10'>跳转2</Link>
            <Test default={10}></Test>
            <Outlet></Outlet>
        </>
    )
}

const RouteTest = () => {
    return <>sbsbsbsbs</>
}

function Router() {
    const element = useRoutes([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: 'asd',
                    element: <RouteTest />,
                },
            ],
        },
        { path: '/team/:id?', element: <Test /> },
        { path: '/toolkit', element: <Toolkit /> },
    ])
    return element
}
export default Router

import { useState } from 'react'
import './App.css'
import { useNavigate, Link, Outlet } from 'react-router-dom'

function Home() {
    const [count, setCount] = useState(0)
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/test', {
            state: {
                name: 'zs',
            },
        })
    }
    return (
        <>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs text-red-400'>Click on the Vite and React logos to learn more</p>
            <button onClick={handleNavigate}>跳转</button>
            <Link to='/test'>跳转2</Link>
            <Outlet></Outlet>
        </>
    )
}

export default Home

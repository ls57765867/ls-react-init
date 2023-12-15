import { lazy } from 'react'
import Home from '@/Home'
import { Navigate } from 'react-router-dom'

const routes = [
    {
        path: '/',
        component: () => <Navigate to='/home/two'></Navigate>,
        name: 'index',
        meta: {
            title: '首页',
        },
    },
    {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
            title: '首页',
        },
        children: [
            {
                path: 'two',
                name: 'two',
                component: lazy(() => import('../pages/two')),
                meta: {
                    title: '二级路由',
                },
            },
        ],
    },
    {
        path: '/test/:id?',
        component: lazy(() => import('../components/Test')),
        name: 'test',
        meta: {
            title: '测试',
        },
    },
    {
        path: '/toolkit/*',
        component: lazy(() => import('../pages/toolkit')),
        name: 'toolkit',
        meta: {
            title: '工具',
        },
    },
]

export default routes

import routes from './routes'
import { Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'

export const Element = (props: (typeof routes)[0]) => {
    const { component: Component, meta } = props
    document.title = meta.title
    // 获取路由信息
    return <Component></Component>
}

const Renderer = (_routes: any) => {
    return (
        <>
            {_routes.map((item: any) => {
                const { name, path } = item
                return (
                    <Route path={path} key={name} element={<Element {...item} />}>
                        {item.children ? Renderer(item.children) : null}
                    </Route>
                )
            })}
        </>
    )
}

export const RouterView = () => {
    return (
        <Suspense fallback={<h1>加载中!!!!</h1>}>
            <Routes>{Renderer(routes)}</Routes>
        </Suspense>
    )
}

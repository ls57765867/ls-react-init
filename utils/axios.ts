// import axios from "axios";

import store, { editFullLoading } from '@/store'

import { handleConfigureAuth, handleAuthError, handleGeneralError, handleNetworkError } from './axios-tools'
import type { InternalAxiosRequestConfig } from 'axios'

const instance = axios.create()

// 当前有效的Ajax请求数
let active = 0
let fullscreenLoading: any

function logWithGroup([groupName, style]: [string, string[]], ...logs: any[]) {
    if (!window.console) {
        return
    }
    if (console.groupCollapsed) {
        console.groupCollapsed(groupName, ...style)
        logs.forEach((log) => {
            console.log(...log)
        })
        console.groupEnd()
    }
}

// showLoading与hideLoading 配合使用, 如果接口返回时间小于500ms, 则active为0 ,不会显示loading
// 500ms 以上时 fullscreenLoading 不为false 则显示loading
function showLoading(scene, isAjax = true) {
    setTimeout(() => {
        if ((isAjax && active === 0) || fullscreenLoading) {
            return
        }
        fullscreenLoading = store.dispatch(editFullLoading(true))
    }, 500)
}
function hideLoading(isAjax = true) {
    isAjax && active--
    setTimeout(() => {
        if (active === 0 && fullscreenLoading) {
            store.dispatch(editFullLoading((fullscreenLoading = false)))
        }
    }, 1)
}

instance.interceptors.request.use((config) => {
    // 让它支持 restful api
    const _config = config as InternalAxiosRequestConfig<any> & { rest: any }
    console.log(_config, 999)
    if (_config.rest) {
        console.log(_config)

        _config.url = _config.url!.replace(/:([^/]+)/g, function (a, b) {
            const param = _config.rest[b]
            delete _config.rest[b]
            return param
        })
    }
    logWithGroup(
        [
            `%c[发送请求]%c[${config?.method?.toUpperCase()}] %c${config.url}`,
            ['color: blue;', 'color: #ab7100;', 'color: gray; font-weight: 400;'],
        ],
        [config],
    )

    active++
    showLoading('[Ajax]' + config.url)
    // 请求拦截器
    return handleConfigureAuth(config) // 处理token
})

instance.interceptors.response.use(
    (response) => {
        logWithGroup(
            [`%c[请求响应] %c${response.config.url}`, ['color: green;', 'color: gray; font-weight: 400;']],
            ['数据', response.data],
            ['XMLHttpRequest', response.request],
            ['Headers', response.headers],
            ['配置信息', response.config],
        )
        hideLoading()
        if (response.status !== 200) return Promise.reject(response.data)
        handleAuthError(response.data.code)
        handleGeneralError(response.data.code, response.data.errmsg)
        return response.data
    },
    (err) => {
        logWithGroup(
            [`%c[请求失败] %c${err.config.url}`, ['color: red;', 'color: gray; font-weight: 400;']],
            ['数据', err.response.data],
            ['Headers', err.response.headers],
            ['XMLHttpRequest', err.response.request],
            ['配置信息', err.response.config],
        )
        hideLoading()
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    },
)

export default instance

/**!
 * Copyright (c) 2017 hillinsight.com, Inc. All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License"), you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 *
 * @file Axios 个性化定制
 * @author lifayu(fyli@hillinsight.com)
 * @since 2018-04-04 15:37
 */
'use strict'

import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'

const instance = axios.create()
let fullscreenLoading = null
let cancelSource

// 当前有效的Ajax请求数
let active = 0

// 默认配置项
const defaults = {
    auth: null,
}

function setDefaults(opt) {
    Object.assign(defaults, opt)
}

function showLoading(scene, isAjax = true) {
    setTimeout(() => {
        if ((isAjax && active === 0) || fullscreenLoading) {
            return
        }
        fullscreenLoading = ElLoading.service({
            fullscreen: true,
        })
    }, 500)
}
function hideLoading(isAjax = true) {
    isAjax && active--
    setTimeout(() => {
        if (active === 0 && fullscreenLoading) {
            fullscreenLoading.close()
            fullscreenLoading = null
        }
    }, 1)
}
// function logWithGroup([groupName, style]) {
//     if (!window.console) {
//         return
//     }
//     if (console.groupCollapsed) {
//         console.groupCollapsed(groupName, ...style)
//         for (let i = 1; i < arguments.length; i++) {
//             console.log(...arguments[i])
//         }
//         console.groupEnd()
//     }
// }

function logWithGroup([groupName, style], ...logs: any[]) {
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

//
instance.defaults.timeout = 16000
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

instance.interceptors.request.use(
    (config) => {
        // 支持rest方式的url地址
        if (config.rest) {
            config.url = config.url.replace(/:([^/]+)/g, function (a, b) {
                let param = config.rest[b]
                delete config.rest[b]
                return param
            })
        }
        logWithGroup(
            [
                `%c[发送请求]%c[${config.method.toUpperCase()}] %c${config.url}`,
                ['color: blue;', 'color: #ab7100;', 'color: gray; font-weight: 400;'],
            ],
            [config],
        )
        if (!config.local) {
            // Loading
            showLoading('[Ajax]' + config.url)
        }
        if (cancelSource) {
            config.cancelToken = cancelSource.token
        }

        active++

        return config
    },
    (err) => {
        hideLoading()
        ElMessage.error({
            message: '发送网络请求失败',
        })
        return Promise.reject(err)
    },
)

instance.interceptors.response.use(
    (res) => {
        logWithGroup(
            [`%c[请求响应] %c${res.config.url}`, ['color: green;', 'color: gray; font-weight: 400;']],
            ['数据', res.data],
            ['XMLHttpRequest', res.request],
            ['Headers', res.headers],
            ['配置信息', res.config],
        )

        hideLoading()
        const json = res.data
        return new Promise((resolve, reject) => {
            if (json.success || json.code === 0) {
                resolve({
                    config: res.config,
                    headers: res.headers,
                    status: res.status,
                    request: res.request,
                    originData: res.data,
                    data: json.data || json.result,
                    code: res.data?.code,
                })
            } else {
                ElMessage.error({
                    message: json.message || json.msg || '操作出错了',
                })
                const error = new Error(json.message || json.msg)
                error.config = res.config
                error.request = res.request
                error.response = res
                reject(error)
            }
        })
    },
    (err) => {
        hideLoading()
        if (!axios.isCancel(err)) {
            const res = err.response
            if (res && res.status === 401) {
                if (typeof defaults.auth === 'function') {
                    defaults.auth()
                    return Promise.reject(new Error('用户未登录'))
                }

                let data = null
                if (typeof res.data === 'string') {
                    try {
                        data = JSON.parse(res.data)
                    } catch (e) {}
                } else {
                    data = res.data
                }
                let url = null
                if (data) {
                    url = data.url || (data.data ? data.data.url : data.result.url)
                }
                // 需要登录
                if (url) {
                    window.location.href = url
                } else {
                    ElMessage.error({
                        message: '登录失效',
                    })
                    setTimeout(() => {
                        window.location.reload(true)
                    }, 1000)
                }
            } else if (res) {
                logWithGroup(
                    [`%c[请求失败] %c${err.config.url}`, ['color: red;', 'color: gray; font-weight: 400;']],
                    ['数据', res.data],
                    ['Headers', res.headers],
                    ['XMLHttpRequest', res.request],
                    ['配置信息', res.config],
                )
                ElMessage.error({
                    message: err.message || '获取数据失败，请稍后重试！',
                })
            } else {
                ElMessage.error({
                    message: err.message || '获取数据失败，请稍后重试！',
                })
            }
        }
        return Promise.reject(err)
    },
)

function install(app, router, options) {
    if (options) {
        setDefaults(options)
    }
    // if (router) {
    //     router.beforeEach(function (to, from, next) {
    //         if (cancelSource) {
    //             cancelSource.cancel('页面离开，取消请求');
    //         }
    //         cancelSource = axios.CancelToken.source();
    //         showLoading('router before', false);
    //         next();
    //     });
    //     router.afterEach(route => {
    //         hideLoading(false);
    //     });
    // }

    // Object.defineProperties(app.config.globalProperties, {
    //     $http: {
    //         get() {
    //             return instance;
    //         }
    //     }
    // });
    app.config.globalProperties.$http = instance
}

export const http = instance

export default install

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

import { Plugin } from 'postcss'

interface Options {
    viewportWidth?: number
}

const Options = {
    viewportWidth: 750, // UI设计稿的宽度，可以修改(375,750)，默认给375
}

export const PostCssPxToViewport = (options: Options = Options): Plugin => {
    const opt = Object.assign({}, Options, options)
    return {
        postcssPlugin: 'postcss-px-to-viewport',
        Declaration(node) {
            // 有些px可能不需要转换  可以自定义名称
            if (node.value.includes('px')) {
                const num = parseFloat(node.value) // 考虑到有小数
                node.value = `${((num / opt.viewportWidth) * 100).toFixed(2)}vw`
            }
        },
    }
}

// tailwind 和 postcss-px-to-viewport 直接设置会冲突 : https://cn.vitejs.dev/config/shared-options.html#css-postcss
// 因为 postcss从postcss.config.js 中获取的数据,而直接设置PostCssPxToViewport会冲突,所以需要在vite.config.js中全部设置,或在postcss中全部设置,不能分别设置
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss(),
                autoprefixer({
                    // 自动添加前缀 的浏览器
                    overrideBrowserslist: [
                        'Android 4.1',
                        'iOS 7.1',
                        'Chrome > 31',
                        'ie >= 8',
                        //'last 2 versions', // 所有主流浏览器最近2个版本
                    ],
                    grid: true,
                }),
                PostCssPxToViewport(),
            ],
        },
    },
})

export const PostCssPxToViewport = (options) => {
    const opt = Object.assign({}, options)
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

export default {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}

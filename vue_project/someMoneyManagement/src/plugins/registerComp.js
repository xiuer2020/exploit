import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    '../components',
    // 其组件目录的相对路径
    false,
    // 是否查询其子目录
    /Base[A-Z]\w+\.(vue|js)$/
    // 匹配基础组件文件名的正则表达式
)


requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    // 获取组件配置

    const componentName = upperFirst(
        camelCase(
            fileName
            .split('/')
            .pop()
            .replace(/\.\w+$/, '')
        )
        // 获取和目录深度无关的文件名

    )
    // 获取组件的 PascalCase 命名

    Vue.component(
        componentName,

        componentConfig.default || componentConfig
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
    )
    // 全局注册组件
})
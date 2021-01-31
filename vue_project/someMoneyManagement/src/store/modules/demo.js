export default {
    namespaced: true,
    // 成为带命名空间的模块
    state: () => ({
        baseTypeTwoWayBindDemo: '基础数据类型双向绑定示例',
        // 基础数据类型双向绑定示例

        msgShow: null,
        // msg是否展示
        msgText: 'msgText组件文字',
        // msgText组件文字
        // BaseMsg组件

    }),
    mutations: {
        showTips(state, msgText) {
            state.msgText = msgText;
            state.msgShow = true;
            setTimeout(() => {
                state.msgShow = false;
            }, 2000)
        },
        // 展示提示


        twoWayBind(state, {
            key,
            value
        }) {
            state[key] = value
        },
        // key: 对象类型的属性
        // value: 输入内容
        // 双向绑定
        toggleStatus(state, {
            key
        }) {
            state[key] = !state[key]
        }
        // 切换状态

    },
    // 接收的第一个参数是模块的局部state
    actions: {

    },
    // 第一个参数context 常用对象结构 { dispatch, commit, getters, rootGetters }
    // 第二个参数 payload载荷
    getters: {
        objTypeTwoWayBindDemo(state) {
            return {
                text: `对象类型双向绑定示例 => 其text属性: ${state.baseTypeTwoWayBindDemo}`
            }
        }
        // 对象类型双向绑定示例

    }
    // 第一个参数: 模块的局部state
    // 第二个参数: 模块的getter
    // 第三个参数: 根节点state
    // 第四个参数: 根节点getter

}
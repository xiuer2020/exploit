import Vue from "vue";
// 导入vue
import "./plugins/axios";
// 使用axios

import "./plugins/registerComp";
// 全局注册组件

import router from "./router/index";
// 引入路由实例

import store from "./store/index";
// 引入store

import App from "./App.vue";
// 引入app组件

Vue.config.productionTip = false;
// 阻止启动生产消息，常用作指令。

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
// vue实例 挂载
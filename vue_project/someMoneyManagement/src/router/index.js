import Vue from "vue";
// 导入vue
import VueRouter from "vue-router";
// 导入vueVueRouter

import routes from "./routes";
// 引入router项

Vue.use(VueRouter);
// 使用VueRouter

const router = new VueRouter({
  routes
});
// 路由实例

export default router;

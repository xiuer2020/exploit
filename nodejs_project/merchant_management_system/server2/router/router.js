//路由层

//导入路由控制器
const routerController = require(__basename + '/router_controller/routerController.js');

module.exports = app => {
  app.get('/send', routerController.send);
  // 提交
}
// 导出方法
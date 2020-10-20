//路由层

const routerController = require(__basename + '/router_controller/routerController.js');
//导入路由控制器

module.exports = app => {

  app.use(routerController.validMailCode);
  //验证邮箱验证码

  app.use(routerController.validToken);
  //验证token，验证登录

  app.post('/register', routerController.register);
  //注册

  app.post('/sendMail', routerController.sendMailCode);
  //发送邮箱验证码

  app.post('/login', routerController.login);
  //登录

  app.get('/businessInfo', routerController.businessInfo);
  //获取用户信息

  app.post('/addType', routerController.addType);
  //添加商品类型

  app.get('/getType', routerController.getTypeData);
  //获取商品类型

  app.get('/searchType', routerController.searchType);
  //搜索商品类型

  app.post('/typeStatus', routerController.toggleTypeStatus);
  //禁用和启用

  app.post('/type', routerController.updateType);
  //修改商品类型

  app.get('/typeRows', routerController.typeRows);
  //获取数据表的记录数

  app.get('/searchRows', routerController.searchRows);
  //获取数据表的记录数

}
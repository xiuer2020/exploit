//路由控制器层

let api = require(__basename + '/api/api.js');
//导入api(服务)层，操作数据库

class RouterController {
  send(req, res){
   api.createData('Call', {
     name: req.query.name,
     email: req.query.email,
     description: req.query.description
   }) 
    res.send({msg: '提交成功', code: 200})
  }
}


module.exports = new RouterController();
//导出请求回应实例
//服务层

class API {
  createData(modelName, o) {
    //modelName: 模型名称, string
    //o: 创建的数据, object
    return model[modelName].create(o);
  }
  //添加数据
}
// 数据的增删改方法

module.exports = new API();
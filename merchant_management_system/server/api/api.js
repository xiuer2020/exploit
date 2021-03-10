//服务层

class API {

  createData(modelName, o) {

    //modelName: 模型名称, string
    //o: 创建的数据, object
    return model[modelName].create(o);
  }
  //添加数据


  findAllData(modelName, where, attributes, limit, offset = 0,  order = [["id", "DESC"]]) {
    //modelName: 模型名称, string
    //where: 查询条件, object
    //attributes: 查询字段, array
    // order: 排序依据, array
    // limit: 查询数量 number
    // offset 结果偏移量 number

    return model[modelName].findAll({
      where,
      attributes,
      order,
      offset,
      limit
    })
  }
  //查询数据 返回promise

  updateData(modelName, values, condition) {
    //modelName: 模型名称, string
    //values: 需要设置的数据, object
    //condition: 条件, object
    return model[modelName].update(values, {
      where: condition
    });
  }
  //更新数据

  count(modelName, condition) {
    //modelName:  模型名称, string
    //condition: 条件, object
    return model[modelName].count({
      where: condition
    });
  }
  //查询数据表的记录数

}

module.exports = new API();
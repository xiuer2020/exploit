//模型集合

//导入商家模型，商家用户表
const Business = require(__basename + '/db/model/business.js');

//导入邮箱验证码模型, 记录邮箱验证码
const Code = require(__basename + '/db/model/code.js');

//导入商品类型模型，保存商品类型数据
const Type = require(__basename + '/db/model/type.js');

//导入商品模型, 保存上传的商品数据
const Product = require(__basename + '/db/model/product.js');

module.exports = {
  Business,
  Code,
  Type,
  Product
}
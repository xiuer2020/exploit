//商家模型(数据表结构)
const Sequelize = require('sequelize');

let Model = Sequelize.Model;

//Business模型继承Model
class Call extends Model {

}

//创建business数据表结构
Call.init({
  id: {
    type: Sequelize.INTEGER.UNSIGNED,
    //数据类型, INTEGER: 整型, UNSIGNED: 无符号

    allowNull: false,
    //是否允许为null

    primaryKey: true,
    //主键

    autoIncrement: true,
    //自动递增

    comment: '表id'
    //备注
  },
  //id字段

  name: {
    type: Sequelize.STRING(10),
    allowNull: false,
    // 是否允许为空

    defaultValue: '',
    //默认值

    comment: '提交者姓名'
  },
  // 提交者姓名字段

  email: {
    type: Sequelize.STRING(20),
    allowNull: false,
    defaultValue: '',
    comment: '提交者邮箱'
  },
  // 商家邮箱字段

  description: {
    type: Sequelize.STRING(1234),
    allowNull: false,
    defaultValue: '',
    comment: '提交信息'
  },
  // 提交信息

  isDestroy: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '注销: 1, 未注销0'
  }
  //是否注销 假删除

}, {
  //配置

  modelName: 'call',
  // 默认为类的名称，即在这种情况下为`Business`。 这将控制自动生成的`foreignKey`（外键）的名称和关联命名

  timestamps: true,
  //是否添加时间戳属性 (updatedAt, createdAt)

  paranoid: true,
  //是否开启假删除
  //不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期

  underscored: true,
  //自动设置字段为蛇型（以_方式命名）命名规则

  freezeTableName: true,
  //是否禁止修改表名
  //默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式。

  tableName: 'call',
  //定义表名

  sequelize
  //连接实例

})


Call.sync({
  force: false
});
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表

module.exports = Call;
//导出模型
const Sequelize = require('sequelize');
//连接mysql数据， ORM层

module.exports = new Sequelize(config.databaseOptions.database, config.databaseOptions.user, config.databaseOptions.password, {
  // config.databaseOptions.database： 数据库名称
  // config.databaseOptions.user ：    用户名
  // config.databaseOptions.password： 用户密码

  host: config.databaseOptions.host,
  //数据库地址

  dialect: config.databaseOptions.dialect,
  //连接数据库类型

  timezone: config.databaseOptions.timezone,
  //时区

  pool: config.databaseOptions.pool
  //设置连接池
})
//创建连接

//路由控制器层

//导入api(服务)层，操作数据库
let api = require(__basename + '/api/api.js');

//导入工具库, 公共方法
let utils = require(__basename + '/utils/utils.js');

//导入moment模块，用于处理日期时间
const moment = require('moment');

const fs = require('fs');
//导入文件系统模块

const {
  Op
} = require('sequelize');

const {
  decode
} = require('punycode');
//获取sequelize操作符模块


class RouterController {

  validMailCode(req, res, next) {
    if (whileList.mailList.indexOf(req.url) > -1) {
      let currentInvalidTime = new Date().getTime() - config.emailCodeInvalid * 60 * 1000;
      //获取当前失效的字段的时间戳 即当前时间减去邮箱验证的过期时间

      //使用moment处理日期时间
      let date = moment(currentInvalidTime).format('YYYY-MM-DD HH:mm:ss');

      api.findAllData('Code', {
        email: req.body.email,
        code: req.body.code,
        createdAt: {
          [Op.gte]: date
        }
      }).then(result => {
        if (result.length == 0) {
          res.send({
            msg: '验证码已失效或者不正确',
            code: 1013
          });
        } else {
          //验证码验证通过

          next();
        }

      }).catch(err => {

        res.send({
          msg: '邮箱验证码验证失败',
          code: 1012
        });
      })
    } else {
      //不需要验证邮箱验证码
      next();
    }
    // 是否需要验证邮箱验证码
    // 是否根据邮箱和验证码查询

  }
  //验证邮箱验证码, 中间件


  validToken(req, res, next) {
    let url = req.url.split('?')[0];
    // 截取请求路径

    if (whileList.tokenList.indexOf(url) > -1) {
      let cookies = utils.transformCookie(req.headers.cookie);
      // 获取cookie

      utils.verifyString({
        value: cookies[config.tokenOptions.cookieName],
        salt: config.tokenOptions.tokenSalt,
        fn: (err, decoded) => {
          if (err) {

            //如果解析失败
            res.send({
              msg: '请先登录',
              code: 1031
            });
          } else {
            req.userId = decoded.data;
            next();
            //token验证通过
            //将userId传递给下一个中间件或者路由的req请求对象
          }
        }
      })
      //解析token
    } else {
      next();
      //不需要验证token，直接通过
    }
    // 是否在需要验证token的请求列表中


  }
  //验证token,登录验证


  sendMailCode(req, res) {

    //存储验证码
    //取随机数后面六位数字
    let code = Math.random().toString().slice(-6);


    api.createData('Code', {
      email: req.body.email,
      code
    }).then(result => {
      console.log("result ==> ", result.dataValues.code);
      res.send({
        msg: '验证码已发至您邮箱',
        code: 1010
      });
      return;
      //开发测试阶段不发邮件
      utils.sendMail(req.body.email, code, (err, info) => {
        if (err) {
          console.log('err ==> ', err);
          //如果发邮件失败
          res.send({
            msg: '发送邮箱验证码失败',
            code: 1011
          });
        } else {
          // 
          res.send({
            msg: '验证码已发至您邮箱',
            code: 1010
          });
        }
      });
    }).catch(err => {

      res.send({
        msg: '发送邮箱验证码失败',
        code: 1011
      })
    })

  }
  //发送邮箱验证码

  register(req, res) {

    //截取请求参数 req.body
    api.findAllData('Business', {
      email: req.body.email
    }).then(result => {
      if (result.length == 0) {
        //该邮箱没有被注册

        let userId = '_b' + new Date().getTime();
        //生成userId

        let passWord = utils.encodeString(config.saltOptions.passWordSalt + req.body.passWord);
        //密码加盐加密

        api.createData('Business', {
          userId,
          nickName: req.body.nickName,
          passWord,
          email: req.body.email
        }).then(() => {
          res.send({
            msg: '注册成功',
            code: 1000
          });
        }).catch(err => {
          console.log('err ==> ', err);

          res.send({
            msg: '注册失败',
            code: 1001
          });
        })
        //添加数据

      } else {
        res.send({
          msg: '该邮箱已经被注册',
          code: 1002
        });
      }
    }).catch(err => {
      console.log("err ==> ", err);
      res.send({
        msg: '注册失败',
        code: 1001
      });
    })
    //查询该邮箱是否被注册


  }
  //注册

  login(req, res) {

    //根据邮箱查询
    api.findAllData('Business', {
      email: req.body.email,
      isDestroy: 0
    }).then(result => {
      if (result.length === 0) {
        res.send({
          msg: '用户不存在',
          code: 1022
        });
      } else {
        let passWord = utils.encodeString(config.saltOptions.passWordSalt + req.body.passWord);
        // 生成加密字符串

        if (passWord == result[0].dataValues.passWord) {

          let token = utils.signString({
            value: result[0].dataValues.userId,
            salt: config.tokenOptions.tokenSalt,
            expires: config.tokenOptions.expires
          });
          //如果密码正确
          //生成token

          res.send({
            msg: '登录成功',
            code: 1020,
            token
          });
        } else {
          res.send({
            msg: '邮箱或者密码不正确',
            code: 1023
          });
        }
        //如果存在用户，则需要验证密码是否正确
      }
      // 是否查询到数据

    }).catch(err => {
      console.log("err ==> ", err);
      res.send({
        msg: '登录失败',
        code: 1021,
        err
      });
    })

  }
  //登录

  businessInfo(req, res) {
    console.log("用户id", req.userId);
    api.findAllData('Business', {
      userId: req.userId,
      isDestroy: 0
    }, ['nickName', 'userImg']).then(result => {
      // 
      res.send({
        msg: '查询用户信息成功',
        code: 1060,
        result: result[0].dataValues
      });
    }).catch(err => {
      // console.log("商家", err);
      res.send({
        msg: '查询用户信息失败',
        code: 1061,
        err
      });
    })
  }
  //获取用户信息

  addType(req, res) {

    let typeId = '_ty' + new Date().getTime();
    //生成类型id

    api.createData('Type', {
      typeId,
      type: req.body.type,
      userId: req.userId
    }).then(result => {

      res.send({
        msg: '添加商品类型成功',
        code: 1040,
        result
      });
    }).catch(err => {

      res.send({
        msg: '添加商品类型失败',
        code: 1041
      });
    })
  }
  //添加商品类型


  getTypeData(req, res) {

    api.findAllData('Type', {
      userId: req.userId,
    }, undefined, Number(req.query.limit), Number(req.query.offset), [
      ['updatedAt', 'DESC']
    ]).then(result => {
      res.send({
        msg: '查询商品类型成功',
        code: 1042,
        result
      });
    }).catch(err => {
      console.log("err ==> ", err);
      res.send({
        msg: '查询商品类型失败',
        code: 1043,
        err
      });
    })
  }
  //获取商品类型数据

  searchType(req, res) {
    api.findAllData('Type', {
      userId: req.userId,
      type: {
        [Op.like]: `%${req.query.type}%`
      }
    }, undefined, Number(req.query.limit), Number(req.query.offset)).then(result => {
      res.send({
        msg: '搜索商品类型成功',
        code: 1044,
        result
      });
    }).catch(err => {

      res.send({
        msg: '搜索商品类型失败',
        code: 1045,
        err
      });
    })
  }
  //搜索商品类型

  toggleTypeStatus(req, res) {
    api.updateData('Type', {
      isEnable: Number(req.body.status)
    }, {
      typeId: req.body.typeId
    }).then(result => {
      //  
      res.send({
        msg: '操作成功',
        code: 1046,
        result
      })
    }).catch(err => {

      res.send({
        msg: '操作失败',
        code: 1047
      })
    })
  }
  //禁用和启用

  updateType(req, res) {
    api.updateData('Type', {
      type: req.body.type
    }, {
      typeId: req.body.typeId
    }).then(result => {
      res.send({
        msg: '更新商品类型成功',
        code: 1048,
        result
      });
    }).catch(err => {

      res.send({
        msg: '更新商品类型失败',
        code: 1049
      });
    })
  }
  //修改类型

  typeRows(req, res) {
    api.count('Type', {
      userId: req.userId
    }).then(result => {
      res.send({
        msg: '获取商品类型数量成功',
        code: 1050,
        result
      });
    }).catch(err => {

      res.send({
        msg: '获取商品类型数量失败',
        code: 1051
      });
    })
  }
  //获取数据表的记录数

  searchRows(req, res) {
    api.count('Type', {
      userId: req.userId,
      type: {
        [Op.like]: `%${req.query.type}%`
      }
    }).then(result => {
      res.send({
        msg: '搜索商品类型成功',
        code: 1044,
        result
      });
    }).catch(err => {

      res.send({
        msg: '搜索商品类型失败',
        code: 1045
      });
    })
  }
  //搜索商品类型数据量




}

//导出
module.exports = new RouterController();
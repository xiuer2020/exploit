//工具库

//导入加密模块, nodejs核心模块
const crypto = require('crypto');

//导入发邮件模块
const nodemailer = require('nodemailer');

//导入生成和解析token模块
const jsonwebtoken = require('jsonwebtoken');

//创建发邮件配置
let transporter = nodemailer.createTransport(config.emailOptions);

class Utils {

  //加密字符串
  encodeString(value) {
    let md5 = crypto.createHash('md5');
    return md5.update(value).digest('hex');
  }

  //发送邮箱验证码,6位数字验证码
  sendMail(emails, code, fn) {

    //emails: 收邮件地址，string, 比如：'xxx@126.com,yyy@qq.com,...'
    //fn: 发邮件完成后，执行的回调函数，fn(err, data) {}
    //如果fn的err存在，则表明发邮件失败
    
    transporter.sendMail({
      //发邮件地址
      from: config.emailOptions.auth.user,

      //收邮件地址
      to: emails,

      //主题
      subject: '邮箱验证码',

      //邮件内容
      text: `您的验证码为：${code}，5分钟内有效`
    }, fn)

  }

  //将cookie转换成普通对象
  transformCookie(cookie) {
    let cookies = cookie.split('; ');
    let cookiesObject = {};
    cookies.forEach(v => {
      let c = v.split('=');
      cookiesObject[c[0]] = c[1];
    });

    return cookiesObject;
  }

  //签名字符串, 生成token
  signString(o) {
    /*
    {
      value: 被签名的字符串,
      salt: 加盐,
      expires: 过期时间
    }
    */

    //过期时间写法
    //60 ==> '60s'
    //'100' ==> '100ms'
    //'2 days' ==> '2天'
    //'10h' ==> '10小时'
    //'7d' ==> '7天'
    return jsonwebtoken.sign({
      //被签名的字符串，建议被签名字符是唯一
      data: o.value
    }, o.salt, {
      expiresIn: o.expires
    })
  }

  //解析签名字符串, 解析token
  verifyString(o) {
    /**
     * {
     *   value: token字符串,
     *   salt: 加盐,
     *   fn: 回调函数
     * }
     * 
     * fn(err, decoded) {}
     */

    jsonwebtoken.verify(o.value, o.salt, o.fn);
  }

}

//导出
module.exports = new Utils();
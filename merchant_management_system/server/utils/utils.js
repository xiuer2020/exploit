//工具库

const crypto = require('crypto');
//导入加密模块, nodejs核心模块

const nodemailer = require('nodemailer');
//导入发邮件模块

const jsonwebtoken = require('jsonwebtoken');
//导入生成和解析token模块

let transporter = nodemailer.createTransport(config.emailOptions);
//创建发邮件配置


class Utils {

  encodeString(value) {
    let md5 = crypto.createHash('md5');
    // 创建并返回一个哈希对象，一个使用所给算法的用于生成摘要的加密哈希
    return md5.update(value).digest('hex');
    // 1 通过提供的数据更新哈希对象
    // 2 计算传入的所有数据的摘要值
  }
  //加密字符串

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
      text: `您的验证码为：${code}，${config.emailCodeInvalid}分钟内有效`
    }, fn)

  }
  //发送邮箱验证码,6位数字验证码


  transformCookie(cookie) {
    let cookies = cookie.split('; ');
    let cookiesObject = {};
    cookies.forEach(v => {
      let c = v.split('=');
      cookiesObject[c[0]] = c[1];
    });

    return cookiesObject;
  }
  //将cookie转换成普通对象


  signString(obj) {
    /*
    {
      obj.value: 被签名的字符串,
      obj.salt: 加盐,
      obj.expires: 过期时间
    }
    */

    return jsonwebtoken.sign({
      //被签名的字符串，建议被签名字符是唯一
      data: obj.value
    }, obj.salt, {
      expiresIn: obj.expires
    })
  }
  //签名字符串, 生成token


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
  //解析签名字符串, 解析token


}

//导出
module.exports = new Utils();
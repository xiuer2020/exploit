//app.js
App({
  onLaunch: function () {
    // 

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,

    initData: function (key, pageInstance, url, validTime = 10, flag = '') {
      // 参数数据
      // key: 缓存键及data属性
      // url: ajax地址
      // validTime: 有效时间
      // pageInstance: 页面实例
      // time: 过期时间
      // flag: 缓存标志
      return new Promise((resolve, reject) => {
        var cache = wx.getStorageSync(`${key}${flag}`);
        var next = false;
        // 判断缓存有效性
        // 

        // 

        if (cache) {
          cache = JSON.parse(cache);
          if (cache.express > Date.now()) {
            next = true;
          }

        }
        // 若无效 则请求
        if (!next) {
          // 

          wx.request({
            url: url,
            success: (result) => {
              var regExp = /<!--KG_TAG_RES_((END)||(START))-->/g;
              cache = result.data.replace(regExp, '')
              // 
              cache = JSON.parse(cache);
              wx.setStorage({
                data: JSON.stringify({
                  express: Date.now() + validTime * 1000 * 60,
                  data: cache
                }),
                key: key
              })
              pageInstance.setData({
                [key]: cache
              })
              resolve();
            },
            fail: (err) => {
              
              reject();
            }
          })
        } else {
          // 更新数据

          // 
          pageInstance.setData({
            [key]: cache.data
          })
          setTimeout(resolve, 0);
        }
      })

    },
    // 请求
    request: function (url, fn, params = null) {
      wx.request({
        url: 'url',
        data: params,
        success: (result) => {
          fn(result)
        },
        fail: (err) => {
          
        }
      })
    }
  }
})
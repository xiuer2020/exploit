// pages/mailInfo/mailInfo.js
Page({
  update: function (e) {
    this.setData({
      [e.currentTarget.dataset.key]: e.currentTarget.dataset.value
    })
  },
  // 更新数据
  toggle: function (e) {
    this.setData({
      [e.currentTarget.dataset.key]: !this.data[e.currentTarget.dataset.key]
    })
  },
  // 切换状态

  updateDateIndex: function (e) {
    this.setData({
      dateIndex: e.detail.value[0]
    })
  },
  // 更新日期所处下标


  navigatorPersonInfo: function (e) {
    wx.navigateTo({
      url: `/pages/personInfo/personInfo?type=${e.currentTarget.dataset.type}`,
    })
  },
  // 进入个人信息页

  switchTabSearch: function () {
    // if(thia.data.order.type && this.data.order.mode && this.data.order.expectTime && this.data.order.insuredValue && this.data.order.senderName && this.data)
    let props = ["addresseeName", "addresseePhone", "addresseeSite", "addresseeDetailSite", "senderName", "senderPhone", "senderSite", "senderDetailSite", "insuredValue", "expectTime", "type", "model"]

    let arr = props.filter(x => this.data.order.hasOwnProperty(x));
    console.log(arr);


    console.log(Date.now());
    
    if(arr.length === props.length && this.data.checked){
      let order = Object.assign({number: `SF${Date.now()}`}, this.data.order);
      let sentedOrders = wx.getStorageSync('sentedOrders');

      wx.setStorageSync("sentedOrders", [...sentedOrders, order]);
      wx.removeStorageSync('order');
      wx.showToast({
        title: '订单已完成',
        icon: 'loading',
        duration: 2000
      })
      wx.switchTab({
        url: `/pages/search/search`,
      })
    }else{
      wx.showToast({
        title: '请将信息填写完整并确认',
        icon: 'loading',
        duration: 2000
      })
    }

   
  },
  // 方法

  updateExpectTime: function () {
    let order = Object.assign({
      expectTime: `${this.data.days[this.data.dayIndex].title}${this.data.dates[this.data.dayIndex][this.data.dateIndex]}`
    }, this.data.order);



    wx.setStorageSync('order', order)

    this.setData({
      order: order,
      show: false
    })
  },
  // 更新期望上门时间



  /**
   * 页面的初始数据
   */
  data: {
    days: [{
        title: "今天"
      },
      {
        title: "明天"
      },
      {
        title: "后天"
      }
    ],
    // 选项卡标题
    dayIndex: 0,
    // 日期所处下标
    baseDates: [
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],
    // 时间
    dates: null,
    // 时间信息
    dateIndex: 0,
    // 时间所处下标

    order: null,
    // 订单信息
    show: false,
    // 半屏反馈组件展示状态
    checked: false
    // 订单确认状态

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面加载");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("页面显示");
    this.setData({
      order: wx.getStorageSync("order")
    })

    var h = new Date().getHours();

    for (let i = 0; i < this.data.baseDates.length; i++) {
      if (Number(this.data.baseDates[i].split('-')[0].split(':')[0]) > h) {
        let dates = this.data.days.map((x, y) => {
          if (y === 0) {
            return this.data.baseDates.slice(i)
          }
          return this.data.baseDates
        })
        this.setData({
          dates: dates
        })
        // diff: i*82*
        break;
      } else if (Number(this.data.baseDates[this.data.baseDates.length - 1].split('-')[0].split(':')[0]) <= h) {
        let days = this.data.days.slice(1);
        let dates = days.reduce(x => {
          x.push(this.data.baseDates)
          return x
        }, [])
        this.setData({
          dates
        })
      }
    }
    // 更新dates数据

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("服务器首次渲染完成");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("页面隐藏");

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("页面卸载");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})
// pages/mailInfo/mailInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    type: null,
    persons: [{
      background: '#f00',
      last: false,
      first: true
    }, {
      background: '#272727',
      first: false,
      last: true
    }],
    borderIcons: [{
      last: true,
      color: '#f00',
      content: '上门取件'
    }, , {
      last: true,
      color: '#272727',
      fontSize: '20rpx',
      content: '必填'
    }],
    days: [
      '今天',
      '明天',
      '后天'
    ],
    dates: [
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
    show: false,
    tabHeight: 82,
    dateHeight: 52,
    checked: false,
    currentSelectedDateIndex: 0,
    currentSelectedDayIndex: 0,
    tempPageY: null,
    // 触摸差值
    diff: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      type: options.type
    })
    var h = new Date().getHours();

    for (let i = 0; i < this.data.dates.length; i++) {
      if (Number(this.data.dates[i].split('-')[0].split(':')[0]) > h) {
        this.setData({
          currentSelectedDateIndex: i,
          diff: -i * this.data.dateHeight * 2
        })
        // diff: i*82*
        break;
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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



  },
  switchChecked: function(){
    this.setData({
      checked: !this.data.checked
    })
  },
  startHandle: function (e) {
    

    this.setData({
      tempPageY: e.changedTouches[0].pageY * 2
    })
  },
  moveHandle: function (e) {
    
    var tempPageY = e.changedTouches[0].pageY * 2;
    var diff = tempPageY - this.data.tempPageY;
    // 

    

    diff += this.data.diff;

    
    var minY = -this.data.dateHeight * 2 * (this.data.dates.length - 5);
    

    if (diff <= minY) {
      this.setData({
        diff: minY,
        tempPageY: tempPageY
      })
    } else if (diff >= 0) {
      this.setData({
        diff: 0,
        tempPageY: tempPageY
      })
    } else {
      this.setData({
        diff: diff,
        tempPageY: tempPageY
      })
    }
  },
  showMpHalfScreenDialog: function () {
    this.setData({
      show: true
    })
  },
  switchActive: function (e) {
    // 

    this.setData({
      [e.currentTarget.dataset.type]: e.currentTarget.dataset.index,
      diff: 0
    })

  },
  navigateToMsg: function () {
    var msg = {
      type: 'warn',
      title: '操作失败',
      desc: '接口尚未完成, 敬请期待',
    }
    msg = JSON.stringify(msg);
    wx.navigateTo({
      url: `/pages/msg/msg?msg=${msg}`,
    })
  },
  navigatorPersonInfo: function(e){
    wx.navigateTo({
      url: `/pages/personInfo/personInfo?type=${e.currentTarget.dataset.type}`,
    })
  },
  switchTabSearch: function(){
    wx.switchTab({
      url: `/pages/search/search`,
    })
  }
})
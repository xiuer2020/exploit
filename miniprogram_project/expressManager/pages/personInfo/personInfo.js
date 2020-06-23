import {
  sites
} from '../../assets/sites';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '寄件人',
    iconText: '寄',
    _list: null,
    show: false,
    hotCitys: ['北京', '上海', '广州', '深圳', '东莞', '杭州', '成都', '南京'],
    siteTitle: ['省份', '城市', '区县'],
    sites: null,
    siteHeight: 40,
    currentSelectedProvince: 0,
    currentSelectedCity: 0,
    currentSelectedCounty: 0,
    provinceTempPageY: null,
    // 触摸差值
    provinceDiff: 0,

    cityTempPageY: null,
    // 触摸差值
    cityDiff: 0,

    countyTempPageY: null,
    // 触摸差值
    countyDiff: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.type === '寄件人') {
      this.setData({
        typee: options.type,
        iconText: options.type.split('')[0],
        _list: {
          first: true,
          last: true,
          background: '#f00'
        }
      })
    } else {
      this.setData({
        type: options.type,
        iconText: options.type.split('')[0],
        _list: {
          first: true,
          last: true,
          background: '#272727'
        }
      })
    }

    // 
    this.setData({
      sites
    })

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
  switchShow: function () {
    this.setData({
      show: !this.data.show
    })
  },
  touchstartHandle: function (e) {

    this.setData({
      [`${e.currentTarget.dataset.type}TempPageY`]: e.changedTouches[0].pageY * 2
    })
  },
  touchmoveHandle: function (e) {

    var diff = e.changedTouches[0].pageY * 2 - this.data[`${e.currentTarget.dataset.type}TempPageY`];

    diff += this.data[`${e.currentTarget.dataset.type}Diff`];

    var minY;
    switch (e.currentTarget.dataset.type) {
      case 'province':
        minY = -(this.data.sites.length - 1) * this.data.siteHeight * 2;
        break;
      case 'city':
        minY = this.data.sites[this.data.currentSelectedProvince].city.length < 5 ? 0 : -(this.data.sites[this.data.currentSelectedProvince].city.length - 1) * this.data.siteHeight * 2;
        break;
      case 'county':
        minY = this.data.sites[this.data.currentSelectedProvince].city[this.data.currentSelectedCity].area.length < 5 ? 0 : -(this.data.sites[this.data.currentSelectedProvince].city[this.data.currentSelectedCity].area.length - 1) * this.data.siteHeight * 2;
        break;
    }
    // 


    if (diff <= minY) {
      diff = minY
    } else if (diff >= 0) {
      diff = 0
    }
    this.setData({
      [`${e.currentTarget.dataset.type}Diff`]: diff,
      [`${e.currentTarget.dataset.type}TempPageY`]: e.changedTouches[0].pageY * 2
    });
  },
  switchIndex: function (e) {
    // 
    // 
    this.setData({
      [`currentSelected${e.currentTarget.dataset.type}`]: e.currentTarget.dataset.index
    })
  },
  affirm: function (e) {
    this.setData({
      show: false
    })
  }
})
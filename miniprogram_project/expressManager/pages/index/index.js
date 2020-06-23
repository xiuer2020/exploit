const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moreText: '展示更多',
    moreIcon: 'icon-xiala',
    showFlag: true,
    showtypes: [],
    parttypes: [],
    swiperItem: ['../../assets/1.jpg', '../../assets/2.jpg', '../../assets/2.jpg'],
    types: [{
        icon: 'icon-jikuaidi',
        title: '寄快递',
        description: '一小时取件'
      },
      {
        icon: 'icon--wodeerweima',
        title: '扫码寄件',
        description: '扫小哥/运单二维码'
      },
      {
        icon: 'icon-jijian',
        title: '寄大件',
        description: '20公斤以上优惠寄'
      },
      {
        icon: 'icon-yinsi',
        title: '隐址寄件',
        description: '隐私保护 前程安心'
      },
      {
        icon: 'icon-niaochao1',
        title: '丰巢寄件',
        description: '24小时自助寄件'
      },
      {
        icon: 'icon-jijiankuozhan',
        title: '同城急送',
        description: '取送代买1小时送达'
      },
      {
        icon: 'icon-tubiaoshangchuanmoban',
        title: '国际及港澳台',
        description: '情系中国 连接世界'
      },
      {
        icon: 'icon-daishou',
        title: '代收贷款',
        description: '放心发货 代您收款'
      },
      {
        icon: 'icon-lenglianwuliujiagong',
        title: '冷链物流',
        description: '全程冷链 新鲜直达'
      },
      {
        icon: 'icon-piliangjijian',
        title: '批量寄',
        description: '便捷寄多个快递'
      },
      {
        icon: 'icon-zhineng',
        title: '服务点自寄',
        description: '去服务点寄件'
      },
      {
        icon: 'icon-zhineng',
        title: '智能寄件',
        description: '更懂你的寄件方式'
      },
      {
        icon: 'icon-songli',
        title: '无忧送礼',
        description: '无地址 批量送'
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    var classList = [];

    // types
    this.data.types.forEach((ele, index) => {
      if (!(index % 2)) {
        classList[index] = 'left'
      } else {
        classList[index] = 'right'
      }
    })

    var tempItems = this.data.types.map((element, index) => {
      element.class = classList[index];
      return element
    })

    this.setData({
      types: tempItems
    })
    var tempShowItems = this.data.types.slice(0, 8);
    this.setData({
      showItems: tempShowItems,
      partItems: tempShowItems

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
  showMore: function () {
    // 

    if (this.data.showFlag) {
      // 

      this.setData({
        showItems: this.data.types,
        showFlag: !this.data.showFlag,
        moreText: '收起',
        moreIcon: 'icon-shouqi'
      })
    } else {
      this.setData({
        showItems: this.data.partItems,
        showFlag: !this.data.showFlag,
        moreText: '展示更多',
        moreIcon: 'icon-xiala'
      })
    }
  },
  toItemPage: function (e) {
    
    
    if (e.detail.type !== '扫码寄件') {
      wx.navigateTo({
        url: `/pages/packageInfo/packageInfo?type=${e.detail.type}`
      })
    } else {
      var msg = {
        type: 'warn',
        title: '操作失败',
        desc: '扫码二维码接口尚未完成, 敬请期待',
      }
      msg = JSON.stringify(msg);
      wx.navigateTo({
        url: `/pages/msg/msg?msg=${msg}`,
      })
    }

  }
})
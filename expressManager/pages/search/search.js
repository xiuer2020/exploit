// pages/search/search.js
Page({
  search: function (e) {
    let searchOrders = this.data.sentedOrders.filter(x => {
      return x.number.indexOf(e.detail.value) !== -1
    })
    this.setData({
      searchOrders
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: "",
    // 搜索值
    searchOrders: null,
    // 搜索到订单
    sentedOrders: null
    // 发送的订单

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      sentedOrders: wx.getStorageSync("sentedOrders")
    })
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

  }
})
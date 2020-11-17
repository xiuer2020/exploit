// pages/insured/insured.js
Page({
  updateInsured: function (e) {
    let order = Object.assign({
      insuredValue: e.currentTarget.dataset.confirm ? this.data.insuredValue : "不保价"
    }, this.data.order);

    wx.setStorageSync('order', order)

    this.setData({
      order: order
    })

    wx.navigateBack({
      delta: 1,
    })

  },

  /**
   * 页面的初始数据
   */
  data: {
    paragraphs: [
      [{
        class: "",
        text: "1、已付费的保价快件，物品"
      }, {
        class: "light-red",
        text: "损坏可以维修"
      }, {
        class: "",
        text: "的，"
      }, {
        class: "light-red",
        text: "在保价金额的限额内"
      }, {
        class: "red",
        text: "赔偿维修费用 "
      }, {
        class: "",
        text: ";物品"
      }, {
        class: "light-red",
        text: "全部灭失"
      }, {
        class: "",
        text: "的，按照"
      }, {
        class: "red",
        text: "实际损失赔偿，但最高不超过保价金额"
      }, {
        class: "",
        text: "; "
      }, {
        class: "light-red",
        text: "部分灭失"
      }, {
        class: "",
        text: "的，按照全部灭失赔偿标准"
      }, {
        class: "red",
        text: "乘以损失比例"
      }, {
        class: "",
        text: "赔偿。"
      }],
      [{
        class: "",
        text: "2、"
      }, {
        class: "light-red",
        text: "请您按照托寄物的实际价值诚信保价，理赔时请提供真实有效价值证明(如发票，合同、付款凭证组合)， 顺丰会结合市场价值和第三方机构意见评估损失价值，不足额保价部分或超额保价部分均无法获得赔偿。"
      }, {
        class: "red",
        text: "如您无法证明托寄物品的实际价值，顺丰将全额退还您的保价费用，按照未保价快件进行赔偿。"
      }],
      [{
        class: "red",
        text: "3、顺丰对下列物品不提供保价服务:"
      }, {
        class: "black block",
        text: "1)价值不易核实的物品，如古玩字画、纪念币、翡翠原石、观赏石等;"
      }, {
        class: "black block",
        text: "2)易损或不易妥善包装的物品，如玉雕、木雕、紫砂壶等;"
      }, {
        class: "black block",
        text: "3)其他运输风险较大的物品。顺丰会不时调整完善不提供保价服:务的物品名称，具体以顺丰收派员与您核实确认的信息为准。"
      }],
      [{
        class: "black",
        text: "4、当您选择"
      }, {
        class: "light-red",
        text: "重货包裹、标准零担"
      }, {
        class: "black",
        text: "产品时，"
      }, {
        class: "light-red",
        text: "需选择保价服务。"
      }],
      [{
        class: "black",
        text: "5、如您希望保价金额大于50万元，请以顺丰收派员与您确认的保价金额为准。"
      }],
      [{
        class: "black",
        text: "6、保价费用计算规则:"
      }, {
        class: "black block",
        text: "1)时效及特惠产品:物品价格在1-500元(含)时，保价费用为1元;物品价格在500 (不含) -1000元 (含)时，保价费用为2元;物品价格在1000元(不含)以上时，保价费用=物品价格*5%0"
      }, {
        class: "black block",
        text: "2)标准零担:物品价格在1-2000元(含)时，保价费用为12元;物品价格在2000元(不含)以上时，保价费用=物品价格* 6%60。"
      }, {
        class: "black block",
        text: "3)重货包裹:物品价格在1-500元(含)时，保价费用为2元;物品价格在500元(不含)以上时，保价费用=物品价格* 6%0o"
      }, {
        class: "black block",
        text: "4)部分易碎品类:保价费用=物品价格*8%，其中时效及特惠产品最低收费2元/票、重货包裹最低收费4元/票、标准零担最低收费16元/票。"
      }, {
        class: "black block",
        text: "5)部分大件物品(20kg以上) , 可能存在最低收费要求，以顺丰收派员与您确认的信息为准。"
      }]
    ],
    // 段落信息
    order: null,
    // 订单信息
    insuredValue: ""
    // 保价值
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
      order: wx.getStorageSync("order")
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
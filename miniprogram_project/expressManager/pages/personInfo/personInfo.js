import {
  sites
} from '../../assets/sites';
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

  updateIndex: function (e) {
    console.log(e);

    let value = e.detail.value || e.currentTarget.dataset.value
    this.setData({
      provinceIndex: value[0],
      cityIndex: value[1],
      countyIndex: value[2],
      pickerValue: value
    })
  },
  // 更新地址所处下标

  search: function () {
    let p1 = new Promise(resole => {

    })

    for (let a = 0; a < this.data.sites.length; a++) {

      if (this.data.sites[a].name.indexOf(this.data.searchValue) !== -1) {
        this.setData({
          provinceIndex: a,
          cityIndex: 0,
          countyIndex: 0,
        })

        let searthResult = this.data.sites[a].city.reduce((x1, y1) => {
          let arr = y1.area.map(x2 => {
            return `${this.data.sites[a].name}${y1.name}${x2}`
          })
          return x1.concat(arr)
        }, [])
        this.setData({
          searchResult: searthResult
        })

        return
      }
      for (let b = 0; b < this.data.sites[a].city.length; b++) {
        if (this.data.sites[a].city[b].name.indexOf(this.data.searchValue) !== -1) {
          this.setData({
            provinceIndex: a,
            cityIndex: b,
            countyIndex: 0
          })

          let searthResult = this.data.sites[a].city[b].area.map(x => {
            return `${this.data.sites[a].name}${this.data.sites[a].city[b].name}${x}`
          })
          this.setData({
            searchResult: searthResult
          })
          return
        }
        for (let c = 0; c < this.data.sites[a].city[b].area.length; c++) {
          if (this.data.sites[a].city[b].area[c].indexOf(this.data.searchValue) !== -1) {
            this.setData({
              provinceIndex: a,
              cityIndex: b,
              countyIndex: c
            })

            let searthResult = [`${this.data.sites[a].name}${this.data.sites[a].city[b].name}${this.data.sites[a].city[b].area[c]}`]
            this.setData({
              searchResult: searthResult
            })
            return
          }
        }
        // 搜索值与区级名匹配下标

      }
      // 搜索值与市级名匹配下标
    }
    // 搜索值与省级名匹配下标
  },
  // 实时搜索
  comfirmSite: function (e) {
    this.setData({
      site: e.currentTarget.dataset.value || `${this.data.sites[this.data.provinceIndex].name}${this.data.sites[this.data.provinceIndex].city[this.data.cityIndex].name}${this.data.sites[this.data.provinceIndex].city[this.data.cityIndex].area[this.data.countyIndex]}`,
      show: false
    })
  },
  // 确认地址信息

  confirmPersonInfo: function () {
    let prefix;
    if (this.data.type === "寄件人") {
      prefix = "sender";
      // 变量前缀
    } else {
      prefix = "addressee"
      // 变量前缀
    }
    if (this.data.name && this.data.phone && this.data.site && this.data.detailSite) {
      let obj = {
        [`${prefix}Name`]: this.data.name ,
        [`${prefix}Phone`]: this.data.phone ,
        [`${prefix}Site`]: this.data.site ,
        [`${prefix}DetailSite`]: this.data.detailSite 
      }
      let order = Object.assign(obj, this.data.order);
      wx.setStorageSync("order", order);
      this.setData({
        order
      })

      wx.navigateBack({
        delta: 1,
      })

    } else {
      wx.showToast({
        title: '请将信息填写完整',
        icon: 'loading',
        duration: 2000
      })
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    order: null,
    // 订单信息
    type: null,
    // 信息类型
    iconClass: null,
    // icon的class名
    show: false,
    // 操作反馈展示状态
    hotCitys: [{
      site: '北京',
      pickerValue: [0, 0, 0]
    }, {
      site: '上海',
      pickerValue: [8, 0, 0]
    }, {
      site: '广州',
      pickerValue: [18, 0, 0]
    }, {
      site: '深圳',
      pickerValue: [18, 1, 0]
    }, {
      site: '东莞',
      pickerValue: [18, 2, 0]
    }, {
      site: '杭州',
      pickerValue: [10, 0, 0]
    }, {
      site: '成都',
      pickerValue: [22, 0, 0]
    }, {
      site: '南京',
      pickerValue: [9, 0, 0]
    }],
    // 热门城市
    siteTitle: ['省份', '城市', '区县'],
    // 地址标题
    site: "",
    // 地址信息
    sites: null,
    // 全国地址信息
    provinceIndex: 0,
    // 当前省级所处下标
    cityIndex: 0,
    // 当前市级所处下标
    countyIndex: 0,
    // 当前区级所处下标
    searchValue: "",
    // 搜索值
    searchResult: null,
    // 搜索结果
    pickerValue: [1, 0, 0]
    // 选择器值
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // onLoad: function () {
    // let options = '{"type": "寄件人"}'

    console.log(options);

    this.setData({
      type: options.type,
      iconClass: options.type === "寄件人" ? "red" : "black",
      sites
    })
    // 初始化
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
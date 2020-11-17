// componets/pageTitle/pageTitle.js
Component({
  options: {
    styleIsolation: 'apply-shared'
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    return: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindtapHandle: function () {
      if (this.data.return) {
        wx.navigateBack()
      }
      // 返回上一页
    }
  }
})
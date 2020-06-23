// componets/item/item.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: null
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
    onTap: function () {
      var myEventDetail = {
        type: this.data.item.title
      } // detail对象，提供给事件监听函数
      var myEventOption = {
      } // 触发事件的选项
      this.triggerEvent('toItemPage', myEventDetail, myEventOption)
    },
  },
  created(){
    
    
  }
})
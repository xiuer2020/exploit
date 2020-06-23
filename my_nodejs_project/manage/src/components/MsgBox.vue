<template>
  <div class="msg-box"></div>
</template>

<script>
import Vue from "vue";
Vue.prototype.$showToast = function(o) {

  //this.$children ==> 页面使用组件集合

  for (let i = 0; i < this.$children.length; i++) {
    let cihldren = this.$children[i].$el;
    if (cihldren.className == 'msg-box') {
      cihldren.textContent = o.message;
      cihldren.style.top = "0px";
      setTimeout(() => {
        cihldren.style.top = "-64px";
      }, o.duration || 2000);
      return;
    }
  }
  
};

export default {
  name: "MsgBox",
};
</script>

<style lang="less" scoped>
.msg-box {
  width: 400px;
  height: 64px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #f8d7da;
  position: fixed;
  top: -64px;
  left: 0;
  right: 0;
  margin: 0 auto;
  text-align: center;
  color: #444;
  line-height: 64px;
  transition: top 0.2s linear;
  z-index: 9999;
}
</style>
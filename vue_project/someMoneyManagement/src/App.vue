<template>
  <div id="app">
    <router-view></router-view>
    <!-- 一级路由出口 -->
  </div>
</template>
<script>

export default {
  create(){
    console.log(this.axios);
  }
};
</script>
<style lang="less">
</style>

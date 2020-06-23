<template>
  <div class="app" id="app">
    
    <!-- 一级路由 -->
    <router-view></router-view>

  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'App'
  }

</script>

<style lang="less">
  // 全局样式
  body{
    margin: 0 auto;
    background-color: #f5f5f5;
  }

  .app{
    min-width: 1170px;
  }

  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .fl{
    float: left;
  }

  .fr{
    float: right;
  }

  .clearfix::after{
    display: block;
    content: "";
    clear: both;
  }

  .auto-img{
    width: 100%;
    display: block;
  }
</style>

<template>
  <div id="app">
    <!-- <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />-->

    <div id="nav">
      <van-nav-bar fixed :placeholder="true">
        <template #left>
          <van-icon name="video-o">
            <span>08</span>
          </van-icon>
        </template>
        <template #title>
          <!-- <router-link to="/">发现</router-link>
          <router-link to="/channel">频道</router-link>
          <router-link to="/about">我的</router-link>
          <div class="slider"></div>-->

          <van-tabs v-model="active" @click="navClickHandle">
            <van-tab title="发现" name="home"></van-tab>
            <van-tab title="频道" name="channel"></van-tab>
            <van-tab title="我的" name="profile"></van-tab>
          </van-tabs>
        </template>

        <template #right>
          <van-icon name="search" />
        </template>
      </van-nav-bar>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  },
  methods: {
    navClickHandle: function(name) {
      // 
      switch (name) {
        case "home":
          this.$router.push("/");
          break;
        case "channel":
          this.$router.push("/channel");

          break;
        case "profile":
          this.$router.push("/profile");

          break;
      }
    }
  }
};
</script>
<style lang="less">
#app {
  
  color: #2c3e50;
}

#nav {
  // padding: 30px;

  .van-nav-bar {
    background: black;
    color: white;
    .van-tabs__nav {
      background: none;
    }
    .van-tab {
      color: rgb(163, 163, 163);
      &.van-tab--active {
        color: white;
      }
      span {
        padding: 0 10px;
      }
    }
    .van-tabs__line {
      background-color: white;
    }

    // .slider {
    //   height: 5px;
    //   width: 42px;
    //   background: white;
    //   position: absolute;
    //   bottom: 0;
    //   left: 97px;
    // }
    .van-icon {
      font-size: 24px;
      color: white;
    }
    .van-icon-video-o {
      position: relative;
      span {
        font-size: 10px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 6px;
        // font-weight: bold;
        transform: scale(0.8);
      }
    }
  }
  a {
    font-weight: bold;
    color: #757575;
    padding: 0 5px;
    margin: 10px;
    line-height: 46px;

    &.router-link-exact-active {
      color: white;
    }
  }
}
</style>

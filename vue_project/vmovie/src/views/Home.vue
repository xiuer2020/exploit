<template>
  <div class="home">
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="30000" indicator-color="white">
      <template v-if="banner">
        <van-swipe-item v-for="(item, index) in banner.list" :key="index">
          <img :src="item.image" alt />
        </van-swipe-item>
      </template>
    </van-swipe>

    <!-- 今日 -->
    <HomeSection v-if="today" :items="today.list">今日</HomeSection>

    <!-- 热门 -->
    <HomeSection v-if="hot" :items="hot.list" :special="true">热门</HomeSection>

    <!-- 专题 -->
    <HomeSection v-if="album" :items="album.list">专题</HomeSection>

    <!-- Posts -->
    <HomeSection v-if="posts" :items="posts.list">{{posts.selection_title}}</HomeSection>

    <!-- history -->

    <van-list v-model="loading" :finished="finished" :offset='5' finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <section v-for="(somedayData, index) in historyData" :key="index">
          <HomeSection :items="somedayData.data.list">{{somedayData.data.selection_title}}</HomeSection>
      </section>

    </van-list>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapActions } from "vuex";
import types from "@/store/TYPES.js";

import HomeSection from "@/components/HomeSection.vue";

import { getIndexPosts } from "@/api/home.js";
import common from "@/assets/tool/common";

export default {
  name: "Home",
  data: function() {
    return {
      list: [],
      loading: false,
      finished: false
    };
  },
  components: {
    HomeSection
  },
  computed: {
    ...mapState({
      banner: state => state.indexData.banner,
      album: state => state.indexData.album,
      hot: state => state.indexData.hot,
      posts: state => state.indexData.posts,
      today: state => state.indexData.today,
      historyData: state => state.historyData,
    })
  },
  methods: {
    ...mapActions([types.INIT_INDEX_DATA, types.GET_MORE_HISTORY_DATA]),
    onLoad() {
      // 
      // // 异步更新数据
      // // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }

      //   // 加载状态结束
      //   this.loading = false;

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);


      
      let url;
      if (this.historyData.length === 0) {
        url = this.posts.next_page_url;
      } else {
        url = this.historyData[this.historyData.length - 1].data.next_page_url;
      }

      

      getIndexPosts(url).then(response => {
        // 加载状态结束
        this.loading = false;
        this.$store.commit(types.GET_MORE_HISTORY_DATA, {
          data: response.data
        });
      });
    }
  },
  created() {
    this.$store.dispatch(types.INIT_INDEX_DATA, { n: 10 });
    console.log(common.getEvent);
    
  }
};
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
  img {
    max-width: 100%;
    vertical-align: middle;
  }
}
</style>

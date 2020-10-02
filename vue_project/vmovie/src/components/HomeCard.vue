<template>
  <div class="card">
    <img :src="item.image" alt />
    <div class="mask"></div>
    <dl>
      <dt>
        <span v-for="(cate, index) in item.cates" :key="index">{{cate.catename}}</span> /
        <span>{{item.duration}}</span>
      </dt>
      <dd>{{item.title}}</dd>
    </dl>
  </div>
</template>

<script>
export default {
  props: ["item"]
};
</script>

<style lang="less" scoped>
.card {
  position: relative;
  display: flex;
  img {
    vertical-align: middle;
    max-width: 100%;
    filter: brightness(0.8);
  }
  dl {
    position: absolute;
    left: 0;
    bottom: 0;
    padding: 15px;
    margin: 0;
    color: white;
    font-size: 14px;
    dt {
      span {
      }
    }
    dd {
        margin: 0;
    }
  }
}
</style>
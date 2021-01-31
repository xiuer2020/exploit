<template>
  <div class="base-msg" :class="{'active':msgShow}">{{msgText}}</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BaseMsg",
  computed:{
      ...mapState('demo', ['msgShow', 'msgText'])
  }
};
</script>

<style lang="less" scoped>
.base-msg {
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
  transition: top 0.5s linear;
  z-index: 9999;

  &.active{
      top: 40px
  }
}
</style>
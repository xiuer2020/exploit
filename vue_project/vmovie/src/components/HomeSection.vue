<template>
  <section class="section" :class="{special: special}">
    <h3>
      <slot></slot>
    </h3>
    <HomeCard v-for="(item, index) in items" :item="item" :key="index"></HomeCard>
  </section>
</template>

<script>
import HomeCard from "@/components/HomeCard.vue";

export default {
  props: ["items", "special"],
  components: {
    HomeCard
  }
};
</script>

<style lang="less">
.section {
  h3 {
    text-align: center;
    width: 100%;
  }
  &.special {
      display: flex;
      flex-wrap: wrap;
    .card {
      width: 50%;
      &:first-of-type {
          width: 100%;
          dl {
          font-size: 14px;
      }
      }
      dl {
          font-size: 12px;
      }
    }
  }
}
</style>
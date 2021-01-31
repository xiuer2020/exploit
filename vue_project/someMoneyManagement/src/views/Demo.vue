<template>
  <div class="demo">
    <div class="input-inner-layout">
      基础数据类型双向绑定示例:
      <input
        type="text"
        v-model="baseTypeTwoWayBindDemo"
        :placeholder="baseTypeTwoWayBindDemo"
      />
    </div>
    <!-- 基础数据类型双向绑定示例 -->

    <div class="input-inner-layout">
      {{ objTypeTwoWayBindDemo.text }}
    </div>
    <!-- 对象类型双向绑定示例 -->

    <div class="valid-test" @click="validTestHandle">
      有效性测试 {{ baseTypeTwoWayBindDemo }}
    </div>
    <!-- 有效性测试 -->
    <div @click="createData">createData 创建数据</div>
    <div @click="updateData">updateData 更新数据</div>
    <div @click="findAllData">findAllData 更新数据</div>
    <BaseMsg></BaseMsg>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import validTest from "../assets/js/validTest";
export default {
  name: "Demo",
  computed: {
    ...mapState("demo", ["validTestData"]),
    ...mapGetters("demo", ["objTypeTwoWayBindDemo"]),
    baseTypeTwoWayBindDemo: {
      get() {
        return this.$store.state.demo.baseTypeTwoWayBindDemo;
      },
      set(v) {
        this.twoWayBind({ key: "baseTypeTwoWayBindDemo", value: v });
      }
    }
  },
  methods: {
    ...mapMutations("demo", ["twoWayBind", "showTips"]),
    // twoWayBind 双向绑定
    // showTips 展示提示框
    validTestHandle: function() {
      let valid = validTest.test({ demo: this.validTestData });
      console.log(valid);
      if (valid.pass === false) {
        this.showTips(valid.msgText);
      }
    },
    // 有效性验证

    createData: function() {
      this.axios({
        method: "post",
        url: "/createData"
      }).then(res => {
        console.log(res);
        this.showTips(res.data.msgText);
      });
    },
    // 创建数据
    updateData: function() {
      this.axios({
        method: "post",
        url: "/updateData",
        data: { id: 3 }
      }).then(res => {
        console.log(res);
      });
    },
    // 更新数据
    findAllData: function() {
      this.axios({
        method: "post",
        url: "/findAllData",
      }).then(res => {
        console.log(res);
      });
    }
    // 查询数据
  },
  created() {}
};
</script>

<style lang="less" scoped>
</style>
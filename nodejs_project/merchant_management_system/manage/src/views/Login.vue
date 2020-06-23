<template>
  <div class="login">
    <div class="login-box clearfix container">
      <div class="manage-title">商家后台管理系统</div>

      <div class="form-box">
        <div class="form-group clearfix">
          <label class="fl form-title" for="email">邮箱</label>
          <div class="fl form-input">
            <input
              type="text"
              class="form-control"
              id="email"
              autocomplete="off"
              v-model="userInfo.email"
              placeholder="请输入邮箱"
            />
          </div>
        </div>

        <div class="form-group clearfix">
          <label class="fl form-title" for="password">密码</label>
          <div class="fl form-input">
            <input
              type="password"
              class="form-control"
              id="password"
              autocomplete="off"
              v-model="userInfo.password"
              placeholder="密码6-16个字符"
            />
          </div>
        </div>

        <div class="form-group form-btn-box">
          <div class="btn-box">
            <button class="btn btn-primary btn-block" @click="login">登录</button>
          </div>

          <div class="clearfix login-text">
            <span class="fl" @click="goRegister">没有账号，立即注册</span>
            <span class="fr">找回密码</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 消息提示 -->
    <MsgBox></MsgBox>
  </div>
</template>

<script>
//导入表单验证文件
import { validForm } from "../assets/js/validForm";

//导入消息提示组件
import MsgBox from "../components/MsgBox";
// 导入通用方法
import { universal } from "../assets/js/universal";
export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        email: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      //表单验证
      let result = validForm.valid(this.userInfo);
      if (result.pass === false) {
        this.$showToast({
          message: result.msg,
          duration: 3000
        });

        return;
      }

      
      
      //发起登录请求
      universal.request("POST", "/login", this.userInfo, result => {
        
        
        if (result.data.code == 1020) {
          
          this.$cookies.set("_abc", result.data.token, "5d");
          this.$router.push({ name: "Type" });
        }
      });
    },

    //跳转到注册
    goRegister() {
      this.$router.push({ name: "Register" });
    }
  },

  //注册局部组件
  components: {
    MsgBox
  },
  created() {
    
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../assets/images/bg.jpg") no-repeat center center;
  background-size: cover;
  .login-box {
    min-width: 576px;
    .manage-title {
      font-size: 48px;
      color: #fff;
      text-align: center;
    }
    .form-box {
      min-width: 440px;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      .form-title {
        display: block;
        width: 80px;
        height: 38px;
        line-height: 38px;
      }
      .form-input {
        width: calc(100% - 80px);
      }
    }
    .form-btn-box {
      margin-top: 40px;
      margin-bottom: 0;
      .btn-box {
        margin-left: 80px;
      }
    }
    .login-text {
      margin-top: 20px;
      color: #444;
      cursor: pointer;
      margin-left: 80px;
    }
  }

  @media (min-width: 992px) {
    .manage-title {
      .v-c();
      left: 16px;
    }
    .form-box {
      .v-c();
      right: 16px;
    }
  }
  @media (max-width: 992px) {
    .manage-title {
      margin-top: 100px;
      margin-bottom: 30px;
      width: 100%;
    }
    .form-box {
      width: 100%;
    }
  }
}
</style>
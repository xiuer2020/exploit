<template>
  <div class="register container-fluid">
    <div class="container register-box">
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
          <label class="fl form-title" for="nickname">昵称</label>
          <div class="fl form-input">
            <input
              type="text"
              class="form-control"
              id="nickname"
              autocomplete="off"
              v-model="userInfo.nickname"
              placeholder="昵称1-10个字符"
            />
          </div>
        </div>

        <div class="form-group clearfix">
          <label class="fl form-title" for="password">密码</label>
          <div class="fl form-input">
            <input
              type="text"
              class="form-control"
              id="password"
              autocomplete="off"
              v-model="userInfo.password"
              placeholder="密码6-16个字符"
            />
          </div>
        </div>

        <div class="form-group clearfix">
          <label class="fl form-title" for="validcode">验证码</label>
          <div class="fl form-input valid-form-input">
            <input
              type="text"
              class="form-control"
              id="validcode"
              autocomplete="off"
              v-model="userInfo.code"
              placeholder="请输入六位验证码"
            />
          </div>
          <div class="valid-code fl">
            <button class="btn btn-secondary btn-block" :disabled="isSend" @click="getCode">{{text}}</button>
          </div>
        </div>

        <div class="form-group clearfix">
          <div class="valid-box">
            <span>将滑块拖动到最右边</span>
            <div class="mask"></div>
          </div>
        </div>

        <div class="form-group form-btn-box">
          <div class="btn-box">
            <button class="btn btn-primary btn-block" @click="register">注册</button>
          </div>
          <div class="clearfix login-text">
            <span class="fr" @click="goLogin">已有账号，立即登录</span>
          </div>
        </div>
      </div>

      <!-- 消息提示 -->
      <MsgBox></MsgBox>
    </div>
  </div>
</template>

<script>
//导入表单验证文件
import { validForm } from "../assets/js/validForm";

//导入消息提示组件
import MsgBox from "../components/MsgBox";
import "../assets/css/global.less";
import Vue from "vue";
import { universal } from "../assets/js/universal";

export default {
  name: "Register",
  data() {
    return {
      userInfo: {
        email: "",
        nickname: "",
        password: "",
        code: ""
      },

      text: "发送邮箱验证码",
      isSend: false
    };
  },

  methods: {
    //获取邮箱验证码
    getCode() {
      //验证邮箱格式是否正确
      let data = { email: this.userInfo.email };
      let res = validForm.valid(data);
      if (res.pass === false) {
        this.$showToast({
          message: res.msg,
          duration: 3000
        });

        return;
      }

      let time = 5;
      this.text = `${time}s后重新发送`;
      this.isSend = true;
      let timer = setInterval(() => {
        if (time == 0) {
          clearInterval(timer);
          timer = null;
          this.text = `发送邮箱验证码`;
          this.isSend = false;
        } else {
          time--;
          this.text = `${time}s后重新发送`;
        }
      }, 1000);

      //发送邮箱验证码
      universal.request("POST", "/sendmail", data, result => {
        
      });
    },

    //注册
    register() {
      //表单验证
      let result = validForm.valid(this.userInfo);
      if (result.pass === false) {
        this.$showToast({
          message: result.msg,
          duration: 3000
        });

        return;
      }

      //发起注册请求
      universal.request("POST", "/register", this.userInfo, result => {
        
        if (result.data.code == 1000) {
          this.goLogin();
        } else {
          this.$showToast({
            message: result.data.msg
          });
        }
      });
    },

    //跳转登录
    goLogin() {
      this.$router.push({ name: "Login" });
    }
  },

  components: {
    MsgBox
  }
};
</script>

<style lang="less" scoped>
// 响应式布局
.register {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url("../assets/images/bg.jpg") no-repeat center center;
  background-size: cover;
  .register-box {
    .manage-title {
      font-size: 48px;
      color: #fff;
      text-align: center;
    }

    .form-box {
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
      .valid-code {
        width: 140px;
      }

      .valid-form-input {
        width: 160px;
        margin-right: 20px;
      }
    }
    .form-btn-box {
      margin-top: 40px;
      margin-bottom: 0;
      .btn-box {
        margin-left: 80px;
      }
      .login-text {
        margin-top: 20px;
        color: #444;
        cursor: pointer;
      }
    }
    .valid-box {
      position: relative;
      height: 38px;
      margin-left: 80px;
      background-color: #ddd;
      text-align: center;
      line-height: 38px;
      user-select: none;
      span {
        color: #fff;
      }
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 60px;
        height: 100%;
        background-color: #e4393c;
        cursor: pointer;
      }
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
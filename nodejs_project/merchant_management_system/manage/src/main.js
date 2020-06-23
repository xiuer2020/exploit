import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

import VueCookies from 'vue-cookies'


//导入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

//导入font-awesome图标库
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.prototype.staticUrl = 'http://127.0.0.1:8002'

//设置基础请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8002'

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 携带cookie
axios.defaults.withCredentials = true

//添加axios请求拦截器, 该方法在请求之前触发
axios.interceptors.request.use(params => {
  // 

  //对于post请求,需要将参数进行序列化
  if (params.method == 'post') {
    let str ='';
    for (let key in params.data) {
      str += key + '=' + params.data[key] + '&'
    }

    str = str.slice(0, -1);

    params.data = str;
  }

  return params;

})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

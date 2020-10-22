import Axios from 'axios';
import Vue from 'vue';

Axios.defaults.baseURL = 'http://127.0.0.1:8003'
//设置基础请求路径

Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
//设置post请求头

Axios.defaults.withCredentials = true
// 携带cookie

Axios.interceptors.request.use(params => {
  if (params.method == 'post') {
    let str = '';
    for (let key in params.data) {
      str += key + '=' + params.data[key] + '&'
    }

    str = str.slice(0, -1);

    params.data = str;
  }
  //对于post请求,需要将参数进行序列化

  return params;

})
//添加axios请求拦截器, 该方法在请求之前触发

Vue.prototype.axios = Axios;
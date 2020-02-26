import axios from 'axios';

// 创建一个axios实例
const service = axios.create({
  // api 的 base_url
  // baseURL: 'http://smmes.nat2app1.cc/', 
  baseURL: '/api',
  // 当跨域请求时发送cookie
  withCredentials: true,
  // 请求超时时间
  timeout: 10000 
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 每次请求都会携带token
    config.headers['Authorization'] = '';
    return config;
  },
  error => {
    // 处理请求错误
    // for debug
    console.log(error);
    return Promise.reject(error);
  }
)

// 请求返回拦截
service.interceptors.response.use(
  response => {
    const res = response.data;
    // 403 身份失效
    if (res.code === 403) {
      // TODO
      Vue.prototype.$tip({
        text: '身份校验失败，请重新登录！',
        type: 'error'
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else if (res.code !== 200) {
      // 非200错误提示
      Vue.prototype.$tip({
        text: res.message || 'Error',
        type: 'error'
      });
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  error => {
     // for debug
    console.log('err' + error);
    Vue.prototype.$tip({
      text: '服务器异常',
      type: 'error'
    });
    return Promise.reject(error);
  }
)

export default service;

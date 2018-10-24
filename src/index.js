import './style/main.css';
import Vue from 'vue';
import router from './router';
import App from './App';
import {install} from 'web-base-ui';
// import './mock.js';

// 注册全局组件
install(Vue);

// 用于组件通信
window.EVENTBUS = new Vue();

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');

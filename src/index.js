import './style/main.css';
// import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import {Loading, Confirm, Prompt} from 'lv-web-ui';
import './data/mock.js';

// 注册全局组件
[Loading, Confirm, Prompt].map(function (component) {
  Vue.component(component.name, component);
});

// 用于组件通信
Vue.prototype.$eventbus = new Vue();
// 状态管理工具
Vue.prototype.$store = store;

// 提示框插件
import '../node_modules/notice.js/dist/noticejs.css';
import Tip from '../node_modules/notice.js/dist/notice.js';
Vue.prototype.$tip = function (option) {
  return new Tip(Object.assign({position: 'bottomRight', timeout: 40}, option)).show();
}

// 判断是否移动端
var client = function () {
  let u = navigator.userAgent;
  return {
    // IE内核
    trident: u.indexOf('Trident') > -1, 
    // opera内核
    presto: u.indexOf('Presto') > -1, 
    // 苹果、谷歌内核
    webKit: u.indexOf('AppleWebKit') > -1, 
    // 火狐内核
    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
    // 是否为移动终端
    mobile: !!u.match(/AppleWebKit.*Mobile.*/), 
    // ios终端
    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), 
    // android终端
    android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, 
    // 是否为iPhone或者QQHD浏览器
    iPhone: u.indexOf('iPhone') > -1 , 
    // 是否iPad
    iPad: u.indexOf('iPad') > -1, 
    // 是否web应该程序，没有头部与底部
    webApp: u.indexOf('Safari') == -1, 
    // 是否微信
    weixin: u.indexOf('MicroMessenger') > -1, 
    // 是否QQ
    qq: u.match(/\sQQ/i) == " qq" 
  };
};
Vue.prototype.$client = client();

// 如果是移动端添加 vconsole 插件，可屏蔽
if (client().mobile) {
  var VConsole = require('vconsole');
  new VConsole();
}

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');

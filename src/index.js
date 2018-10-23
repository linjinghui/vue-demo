import './style/main.css';
import Vue from 'vue';
import router from './router';
import App from './App';
// import './mock.js';

const app = new Vue({
  router,
  ...App
});

app.$mount('#app');

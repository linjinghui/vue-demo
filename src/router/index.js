import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('./login/index.vue');

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }
    //, {
    //   path: '/index',
    //   name: 'index',
    //   component: Index,
    //   children: [
    //     {
    //       path: '/',
    //       name: 'section',
    //       component: Section
    //     },
    //     {
    //       path: '/home',
    //       name: 'home',
    //       component: Home
    //     }
    //   ]
    // }
  ]
});

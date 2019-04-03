// import Vue from 'vue';
import Router from 'vue-router';

const Login = () => import('./login/index.vue');
const Index = () => import('./index/index.vue');
const Mixapp = () => import('./mixapp/index.vue');
const H5app = () => import('./h5app/index.vue');
const Devtool = () => import('./devtool/index.vue');

Vue.use(Router);

export default new Router({
  mode: 'hash', // history, hash
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, 
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/',
          name: 'mixapp',
          component: Mixapp
        },
        {
          path: '/mixapp',
          name: 'mixapp',
          component: Mixapp
        },
        {
          path: '/h5app',
          name: 'h5app',
          component: H5app
        },
        {
          path: '/devtool',
          name: 'devtool',
          component: Devtool
        }
      ]
    }
  ]
});

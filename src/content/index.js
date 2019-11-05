import App from './App.vue'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import '../utils/tools'

Vue.use(ElementUI);

import Login from './components/login'


import axios from 'axios'
Vue.prototype.$axios = axios;

// //添加请求拦截器
axios.interceptors.request.use(
    config => {
      if(sessionStorage.CSRF){
        config.headers['csrf'] = sessionStorage.CSRF;
      }
      if(sessionStorage.Account){
        config.headers['a'] = sessionStorage.Account;
      }
      if(sessionStorage.Password){
        config.headers['p'] = sessionStorage.Password;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
);

// 通过Chrome插件的API加载字体文件
(function insertElementIcons() {
  let elementIcons = document.createElement('style')
  elementIcons.type = 'text/css';
  elementIcons.textContent = `
        @font-face {
            font-family: "element-icons";
            src: url('${ window.chrome.extension.getURL("fonts/element-icons.woff")}') format('woff'),
            url('${ window.chrome.extension.getURL("fonts/element-icons.ttf ")}') format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
        }
    `
  document.head.appendChild(elementIcons);
})();


const app = (Vue.prototype.$app = new Vue(App).$mount())
document.body.appendChild(app.$el)
//
// const login = (Vue.prototype.$login = new Vue(Login).$mount())
// document.body.appendChild(login.$el)

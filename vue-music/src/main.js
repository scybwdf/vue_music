import 'babel-polyfill'
import VuelazyLoad from 'vue-lazyload'
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import store from './store'
import 'common/stylus/index.styl'
/* eslint-disable no-new sss*/
fastclick.attach(document.body)
Vue.use(VuelazyLoad,{
    loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

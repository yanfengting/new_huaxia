import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import registryDialog from './components/common/dialog/index'

import store from './store' // 引入store

Vue.config.productionTip = false
Vue.prototype.axios = axios

// 开发环境
if (process.env.NODE_ENV === 'development') {
  // require('./mock/mock.js')
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

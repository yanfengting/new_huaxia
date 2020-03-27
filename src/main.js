import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import registryDialog from './components/common/dialog/index'

import store from './store' // 引入store

Vue.prototype.$dialog = (text, icon = 'success', show = true) => {
  return registryDialog.showDialog(text, icon, show)
}
Vue.config.productionTip = false
Vue.prototype.axios = axios

// 请求拦截器
axios.interceptors.request.use(function (config) {
  let userInfo = localStorage.getItem('userInfo')
  let token = ''
  // if (userInfo !== undefined && userInfo.length > 10) {
  if (userInfo && userInfo.length > 10) {
    userInfo = JSON.parse(userInfo)
    if (userInfo.token) {
      token = userInfo.token
    }
  }
  // console.log(config)
  config.withCredentials = true
  config.headers = {
    token: token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
axios.defaults.timeout = 30000 // 超时时间
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // token 已过期，重定向到登录页面
  if (response.data.status === 401) {
    localStorage.clear()
    router.replace('/')
  }
  return response
}, function (error) {
  if (error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    return {
      data: {
        status: 601
      }
    }
  }
  // Do something with response error
  return Promise.reject(error)
})
// headers: { 'token': this.userInfo.token }

// 开发环境
if (process.env.NODE_ENV === 'development') {
  require('./mock/mock.js')
}

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

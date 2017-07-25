// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import MuseUI from 'muse-ui'
import vuex from 'vuex'
import 'muse-ui/dist/muse-ui.css'


Vue.config.productionTip = false

// 使用插件
Vue.use(MuseUI)
Vue.use(Vuex)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

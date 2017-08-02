// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './util/modifiedAxios'
import MuseUI from 'muse-ui'
import store from './store'
import showdown from '../static/showdown.min.js'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css'
import {TweenMax, Power2, TimelineLite} from "gsap";

Vue.config.productionTip = false

// 使用插件
Vue.use(MuseUI)
axios
  .interceptors
  .request
  .use((config) => {

    return config
  })
//全局注册axios
Vue.prototype.$http = axios

/**
 * @description
 * 生成一个md转换为html的转换器
 *
 * @param {any} opt
 * @returns
 */
function md2HTMLConverter(opt) {
  var converter = new showdown.Converter(opt);
  return function (text) {
    return html = converter.makeHtml(text);
  }
}

Vue.filter('md2HTML',md2HTMLConverter())

/* eslint-disable no-new */
new Vue({el: '#app', router, store, template: '<App/>', components: {
    App
  }})

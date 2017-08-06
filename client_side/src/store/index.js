import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import index from './modules/index.js'
import post from './modules/post'
import me from './modules/me'
import login from './modules/login'


Vue.use(Vuex)


export default new Vuex.Store({
  actions,
  getters,
  modules: {
    index,
    post,
    me,
    login
  }
})

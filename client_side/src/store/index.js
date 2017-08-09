import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import postList from './modules/postList.js'
import post from './modules/post'
import me from './modules/me'
import login from './modules/login'


Vue.use(Vuex)


export default new Vuex.Store({
  actions,
  getters,
  modules: {
<<<<<<< HEAD
    index,
    post,
    me,
    login
=======
    postList,
    post
>>>>>>> master
  }
})

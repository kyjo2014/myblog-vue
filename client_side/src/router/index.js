import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../view/index'
import articleView from '../view/posts'
import loginView from '../view/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    components: {
      content: indexView
    }
  }, {
    path: '/posts/:id',
    name: 'posts',
    component: articleView
  }, {
    path: '/login',
    name: 'login',
    component: loginView
  }]
})

import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../components/view/index'
import articleView from '../components/view/posts'
import loginView from '../components/view/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    name: 'index',
    component: indexView
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

import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../components/view/index'
import articleView from '../components/view/post'
import loginView from '../components/view/login'
import manageView from '../components//view/manage'

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
    path: '/manage',
    name: 'manage',
    component: manageView
  }]
})

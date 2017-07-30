import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../view/index'
import postView from '../view/post'
import postInfoView from '../view/postInfo'
import meView from '../view/me.vue'
import manageView from '../view/manage'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      components: {
        content: indexView,
        sideBar: meView
      }
    }, {
      path: '/posts/:id',
      name: 'posts',
      components: {
        content: postView,
        sideBar: postInfoView
      }
    }, 
    {
      path: '/manage',
      name: 'manage',
      component: manageView
    }
  ]
})

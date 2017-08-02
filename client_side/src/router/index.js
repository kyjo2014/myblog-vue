import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../view/index'
import postView from '../view/post'
import postInfoView from '../view/postInfo'
import meView from '../view/me.vue'
import manageView from '../view/manage'
import manageSiderBarView from '../view/manageSideBar'
import manageContentView from '../view/manage'
import managePostView from '../view/managePostView.vue'
import manageBookView from '../view/manageBookView.vue'
import manageUserView from '../view/manageUserView.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
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
    }, {
      path: '/manage',
      name: 'manage',
      components: {
        sideBar: manageSiderBarView,
        content: manageContentView
      },
      children: [
        {
          path: 'posts',
          components: {
            manage: managePostView
          }
        }, {
          path: 'users',
          components: {
            manage: manageUserView
          }
        }, {
          path: 'books',
          components: {
            manage: manageBookView
          }
        }
      ],
      redirect: '/manage/posts'
    }
  ]
})

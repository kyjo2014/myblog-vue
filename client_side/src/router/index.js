import Vue from 'vue'
import Router from 'vue-router'
import indexView from '../view/index'
import meView from '../view/me.vue'
import manageContentView from '../view/manage'
// import postView from '../view/post' import postInfoView from
// '../view/postInfo' import manageSiderBarView from '../view/manageSideBar'
// import managePostView from '../view/managePostView.vue' import manageBookView
// from '../view/manageBookView.vue' import manageUserView from
// '../view/manageUserView.vue' import managePostListView from
// '../view/managePostList.vue'





const postView = () => import ('../view/post')
const postInfoView = () => import ('../view/postInfo')
const manageSiderBarView = () => import ('../view/manageSideBar')
const managePostView = () => import ('../view/managePostView.vue')
const manageBookView = () => import ('../view/manageBookView.vue')
const manageUserView = () => import ('../view/manageUserView.vue')
const managePostListView = () => import ('../view/managePostList.vue')

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
          name: 'manage-post',
          components: {
            manage: managePostView
          }
        }, {
          path: 'postsList',
          name: 'manage-postList',
          components: {
            manage: managePostListView
          }
        }, {
          path: 'users',
          name: 'manage-user',
          components: {
            manage: manageUserView
          }
        }, {
          path: 'books',
          name: 'manage-book',
          components: {
            manage: manageBookView
          }
        }
      ],
      redirect: '/manage/posts'
    }
  ]
})

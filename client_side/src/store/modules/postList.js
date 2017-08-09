import axios from '../../util//modifiedAxios'
export default {
  state : {
    posts: {}, //属性名是第X页
    pageIdx: 1, //当前页面数
    total: 3, //总共页数
    perPage: 10 //一页文章数目
  },
  getters : {
    posts: state => state.posts,
    pageIdx: state => state.pageIdx,
    total: state => state.total
  },
  mutations : {
    updatePosts(state, posts) {
      Object.assign(state, {
        posts: {
          ...state.posts,
          [posts.pageIdx]: posts.posts
        },
        total: posts.total,
        pageIdx: posts.pageIdx
      })
    },
    changePage(state, pageIdx) {
      Object.assign(state, {pageIdx})
    }
  },
  actions : {
    rmPost({
      commit,
      state
    }, postId) {
      axios
        .delete(`/posts/${postId}`)
        .then((res) => {
          res.data.code == '200' && commit()
        }, (err) => {
          alert(err)
        })
    },
    loadPage({
      commit,
      state
    }, pageIdx) {
<<<<<<< HEAD:client_side/src/store/modules/index.js
      if (!state.posts[pageIdx]) {
        axios
          .get('/posts', {
            params: {
              pageIdx,
              perPage: 10
            }
=======
      !state.posts[pageIdx] && axios
        .get('/posts', {
        params: {
          pageIdx,
          perPage: 10
        }
      })
        .then((res) => {
          res.data.code == '200' && commit('updatePosts', {
            pageIdx,
            posts: res.data.data.posts,
            total: res.data.data.Pagination.totalPage
>>>>>>> master:client_side/src/store/modules/postList.js
          })
          .then((res) => {
            res.data.code == '200' && commit('updatePosts', {
              pageIdx,
              posts: res.data.data.posts,
              total: res.data.data.Pagination.totalPage
            })
          }, (err) => {
            alert(err)
          })
      } else {
        commit('changePage', pageIdx)
      }
    }
  }
}

//这里只保存文章的简略信息

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
          //默认如果没存在新的页面就默认更新当前页面
          [posts.pageIdx || state.pageIdx]: {
            data: posts.posts,
            shouldUpdate: false //如果执行删除动作后，该页后面的条目都要进行更新
          }
        },
        total: posts.total
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
          if (res.data.code == '200') {
            for (let i = state.pageIdx, len = state.totalPage; i < len; i++) {
              state.posts[i].shouldUpdate = true //下面的页码需要再次更新
            }
            axios
              .get('/posts', {
              params: {
                pageIdx: state.pageIdx,
                perPage: 10
              }
            })
              .then((res) => {
                if (res.data.code == 200) {
                  commit('updatePosts', {
                    posts: res.data.data.posts,
                    total: res.data.data.Pagination.totalPage
                  })
                }

              }, (err) => {
                alert(err)
              })
          }
        }, (err) => {
          alert(err)
        })
    },
    loadPage({
      commit,
      state
    }, pageIdx) {
      (!state.posts[pageIdx] || state.posts[pageIdx].shouldUpdate) && axios
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
          })
        }, (err) => {
          alert(err)
        })
    }
  }
}

//保存一篇文章的详细信息

import axios from '../../util//modifiedAxios'
export default {
  state : {
    id: -1,
    tags: [],
    sort: null,
    title: '',
    content: '',
    info: {
      author: '',
      createAt: '',
      updateAt: '',
      readerAmount: 0
    }

  },
  getters : {
    post: state => state
  },
  mutations : {
    //更新该文章
    updatePost(state, post) {
      Object.assign(state, {
        ...post
      })
    },
    //把文章保存在localstorage
    saveInDrafts(state, post) {
      let dat = new Date()
      window
        .localStorage
        .setItem(`post-${id}`, JSON.stringify(state))
      //保存更新日期，解决多个终端上有草稿导致冲突
    },
    recoverFromDrafts(state, postId) {
      let post = JSON.parse(window.localStorage.getItem(`post-${postId}`))
      Object.assign(state, post)
    }
  },
  actions : {
    fetchPost({
      commit,
      state
    }, postId) {
      axios
        .get(`/posts/${postId}`)
        .then((res) => {
          let data = res.data
          data.code == 200 && commit('updatePost', data.data)
        }, (err) => {
          console.error(err)
        })
    }
  }
}

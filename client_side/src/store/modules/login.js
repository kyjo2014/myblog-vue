import axios from '../../util//modifiedAxios'
export default {
  state: {
    isOpen: false

  },
  getters: {
    isOpen: state => state.isOpen,

  },
  mutations: {
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
    close(state) {
      state.isOpen = false
    },
    open(state) {
      state.isOpen = true
    }

  },
  actions: {

    login({
      commit,
      state
    }, userInfo) {
      axios
        .post('./login', userInfo)
        .then((res) => {
          console.log(res)
        }, (err) => {
          alert(err)
        })
    }
  }
}

import axios from '../../util//modifiedAxios'
export default {
  state: {
    icon: '',
    name: '',
    info: {

    }
  },
  getters: {
    user: state => state
  },
  mutations: {
    updateUser(state, user) {
      let {
        icon,
        name,
        info
      } = user
      Object.assign(state, {
        icon,
        name,
        info
      })
    }

  },
  actions: {
    fetchUser({
      commit,
      state
    }) {
      !state.posts[pageIdx] && axios
        .get('./posts', {
          params: {
            pageIdx
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

import axios from '../../util//modifiedAxios'
export default {
  state: {
    isOpen: false

  },
  getters: {
    isOpen: state => state.isOpen,

  },
  mutations: {
    close(state) {
      Object.assign(state, {
        isOpen: false
      })
    },
    open(state) {
      Object.assign(state, {
        isOpen: true
      })
    }

  },
  actions: {

    login({
      commit,
      state
    }, userInfo) {
      axios
        .post('/users/login', userInfo)
        .then((res) => {
          window.localStorage.setItem('jwt', res.data.data.token)
          commit('close')
        }, (err) => {
          console.log(err)
        })
    }
  }
}

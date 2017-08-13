import axios from '../../util//modifiedAxios'
export default {
  state: {
    isOpen: false,
    isHost: false

  },
  getters: {
    isOpen: state => state.isOpen,
    isHost: state => state.isHost
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
    },
    isHost(state, is) {
      Object.assign(state, {
        isHost: is
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
          if (res.data.data.token) {
            window
              .localStorage
              .setItem('jwt', res.data.data.token)
            commit('isHost', res.data.data.isHost)
            commit('close')

          }

        }, (err) => {
          console.log(err)
        })
    }
  }
}

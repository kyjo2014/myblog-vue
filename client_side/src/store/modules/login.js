import axios from '../../util//modifiedAxios'
export default {
  state: {
    isOpen: false,
    isHost: false,
    userName: '',
  },
  getters: {
    isOpen: state => state.isOpen,
    isHost: state => state.isHost,
    user: state => state.userName
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
    },
    setUser(state, userName) {
      Object.assign(state, {
        userName
      })
    }
  },
  actions: {
    checkStatus({
      commit,
      state
    }) {

      axios
        .get('/users/checkstatus')
        .then((res) => {
          if (res.data.code == '200') {
            commit('isHost',res.data.data.isHost)
            commit('setUser',res.data.data.name)
          }
        }, (err) => {
          alert(err)
        })
    },
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

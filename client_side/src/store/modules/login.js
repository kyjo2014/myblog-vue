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
        .post('./login', userInfo)
        .then((res) => {
          console.log(res)
        }, (err) => {
          alert(err)
        })
    }
  }
}

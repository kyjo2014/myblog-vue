import axios from '../../util//modifiedAxios'
export default {
  state: {
    icon: '',
    name: '',
    info: {

    }
  },
  getters: {
    me: state => state
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
      if (state.icon == '') {
        axios
          .get('./me')
          .then((res) => {
            res.data.code == '200' && commit('updateUser', res.data.data)
          }, (err) => {
            alert(err)
          })
      }
    }
  }
}

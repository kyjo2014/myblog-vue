import axios from '../../util//modifiedAxios'
export default {
  state: {
    id: -1,
    tags: [],
    sort: null,
    title: '',
    content: '',
    info: {
      author: '',
      createAt: '',
      readerAmount: 0
    }



  },
  getters: {
    post: state => state,

  },
  mutations: {
    updatePost(state, post) {
      Object.assign(state, {
        ...post
      })
    }
  },
  actions: {
    fetchPost({
      commit,
      state
    }, postId) {
        axios
            .get(`/posts/${postId}`)
            .then((res) => {
                let data = res.data
                data.code == 200 && commit('updatePost',data.data)
            }, (err) => {
                console.error(err)
            })
    }
  }
}

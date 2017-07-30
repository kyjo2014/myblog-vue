import axios from 'axios'
export default {
    state : {
        posts: {}, //属性名是第X页
        pageIdx: 1,
        total: 3
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
                    [posts.pageIdx]: posts.posts
                },
                total: posts.total
            })
        },
        changePage(state, pageIdx) {
            Object.assign(state, {pageIdx})
        }
    },
    actions : {
        loadPage({
            commit,
            state
        }, pageIdx) {
            !state.posts[pageIdx] && axios
                .get('./posts', {params: {
                    pageIdx
                }})
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
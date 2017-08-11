export default {
    state : {
        message: ''
    },
    getters : {
        message: state => state
    },
    mutations : {
        updateMessage(state, message) {

            Object.assign(state, {message})
        }

    }
}

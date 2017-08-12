export default {
    state : {
        errMessage: ''
    },
    getters : {
        message: state => state
    },
    mutations : {
        updateMessage(state, message) {

            Object.assign(state, {errMessage: message})
        }

    }
}

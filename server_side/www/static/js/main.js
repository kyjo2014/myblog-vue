/**
 * @description 
 * 页面初始化 
 */
(function init() {
    attachEvent()
})()

function attachEvent() {
    bindEvent('#login', 'submit', login)
}

function login(e) {
    e.preventDefault();
    console.log(e)
    fetch('http://localhost:3000/users/login', {
        method: "POST",
        body: {
            id: 'host',
            password: '123'
        }
    })
}


/**
 * @description 
 * 进行事件绑定
 * @param {string} sel 
 * @param {string} event 
 * @param {function} cb 
 */
function bindEvent(sel, event, cb) {
    let doc = document
    doc.querySelector(sel).addEventListener(event, cb)
}
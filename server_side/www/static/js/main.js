/**
 * @description 
 * 页面初始化 
 */
(function init() {
    attachEvent()
    getArticle()
})()

/**
 * @description 
 * 顺序事件绑定
 * 
 */
function attachEvent() {
    bindEvent('#login', 'submit', login)
    bindEvent('.uploadArticle', 'click', postArticle)
}

/**
 * @description
 * 登录 
 * @param {any} e 
 */
function login(e) {
    e.preventDefault();
    fetch('http://localhost:3000/users/login', {
        method: "POST",
        body: {
            id: 'host',
            password: '123'
        }
    }).then(res => {
        res.json()
            .then(data => {
                setToken('kblog', data.data.token)
            })
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


/**
 * @description 
 * 拉取文章列表
 */
function getArticle() {
    fetch('http://localhost:3000/posts')
        .then((res) => {
            res
                .json()
                .then(body => {
                    if (body.code == '200') {
                        let data = body.data
                        for (var i = 0; i < data.length; i++) {
                            appendToNode('.article', createArticle(data[i]))
                        }
                    }
                })

        })
}


/**
 * @description 
 * 返回文章的html代码
 * @param {any} context 
 * @returns  
 */
function createArticle(context) {
    let {
        id,
        title,
        content
    } = context

    return `<article class="posts" id="${id}">
        <h2>${title}</h2>
        <div class="content">
            ${content}
        </div>
    <article>
    `
}



/**
 * @description 
 * 把html片段插入到节点
 * 
 * @param {any} parent 
 * @param {any} html 
 */
function appendToNode(parent, html) {
    console.log(parent)
    document.querySelector(parent).innerHTML += html
}


/**
 * @description 
 * 
 * 
 */
function postArticle() {
    fetch('http://localhost:3000/posts', {
            method: 'POST',
            body: {
                title: '123',
                content: '12345'
            },
            headers: {
                Authorization: getToken('kblog')
            }
        })
        .then(res => {
            console.log(res.body)
        })
}


/**
 * @description 
 * 读取token
 * @param {any} name 
 * @returns  
 */
function getToken(name) {
    return window.localStorage.getItem(name)
}


/**
 * @description 
 * 设置token
 * @param {any} name 
 * @param {any} value 
 */
function setToken(name, value) {
    const ls = window.localStorage
    if (ls.getItem(name)) {
        ls.removeItem(name)
    }
    ls.setItem(name, value)
}
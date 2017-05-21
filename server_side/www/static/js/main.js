/**
 * @description 
 * 页面初始化 
 */
(function init() {
    attachEvent()
    getArticle()
})()

function attachEvent() {
    bindEvent('#login', 'submit', login)
}

function login(e) {
    e.preventDefault();
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
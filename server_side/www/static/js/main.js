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
    bindEvent('#register', 'submit', signup)
    bindEvent('#rmUser', 'submit', rmUser)
    bindEvent('.uploadArticle', 'click', postArticle)
    bindEvent('.article', 'click', delPost)
    bindEvent('#source', 'keyup', (e) => {
        md2HTML('#source', '#converted')
    })
}

/**
 * @description
 * 登录 
 * @param {any} e 
 */
function login(e) {
    e.preventDefault();
    let doc = document
    let model = 1 //1是管理员 0是游客
    let body
    if (model) {
        body = JSON.stringify({
            id: doc.querySelector('.login-main').value,
            password: doc.querySelector('.login-sub').value
        })
    } else {
        body = JSON.stringify({
            email: doc.querySelector('.login-main').value,
            nickname: doc.querySelector('.login-sub').value
        })
    }
    fetch('http://localhost:3000/users/login', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: body
    }).then(res => {
        res.json()
            .then(data => {
                setToken('kblog', data.data.token)
            })
    })
}


/**
 * @description 
 * 注册
 * @param {any} e 
 */
function signup(e) {
    e.preventDefault()
    let doc = document
    let body

    body = JSON.stringify({
        email: doc.querySelector('.signup-main').value,
        password: doc.querySelector('.signup-sub').value
    })

    fetch('http://localhost:3000/users/register', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: body
    }).then(res => {
        res.json()
            .then(data => {
                alert(data.message)
            })
    })
}


function rmUser(e) {
    e.preventDefault()
    let doc = document
    let id = doc.querySelector('.rmuser-sub').value
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getToken('kblog')
        }
    }).then(res => {
        res.json()
            .then(body => {
                console.log(body)
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
 * 通过id获取文章
 * @param {any} id 
 * @returns  
 */
async function getArticleById(id) {
    let res = await fetch(`http://localhost:3000/posts/${id}`)
    let data = await res.json()
    return data.data
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
        <div class="del" post-id="${id}" >
            删除
        </div>
    <article>
    `
}


/**
 * @description 
 * 删除文章
 * @param {any} e 
 */
async function delPost(e) {
    let target = e.target
    let id = target.getAttribute('post-id')
    let res = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + getToken('kblog')
        }
    })
    let data = await res.json()
}


/**
 * @description 
 * 把html片段插入到节点
 * 
 * @param {any} parent 
 * @param {any} html 
 */
function appendToNode(parent, html) {
    document.querySelector(parent).innerHTML += html
}


/**
 * @description 
 * 
 * 
 */
function postArticle() {
    let doc = document
    let title = doc.querySelector('.article-title').value
    let content = doc.querySelector('.article-content').value

    let body = JSON.stringify({
        title,
        content
    })

    fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getToken('kblog'),
                'content-type': 'application/json'
            },
            body: body
        })
        .then(res => {
            res.json()
                .then(data => {
                    alert('上传成功')
                })
        })
        .catch(data => {
            alert('上传失败')
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



/**
 * @description 
 * 生成一个md转换为html的转换器
 * 
 * @param {any} opt 
 * @returns  
 */
function md2HTMLConverter(opt) {
    var converter = new showdown.Converter(opt);
    return function (text) {
        return html = converter.makeHtml(text);
    }
}

/**
 * @description 
 * 用于转换md 成html
 * @param {any} from 
 * @param {any} to 
 */
function md2HTML(from, to) {
    let doc = document
    let fromNode = doc.querySelector(from)
    let toNode = doc.querySelector(to)
    const update = md2HTMLConverter()
    toNode.innerHTML = update(fromNode.value)
}
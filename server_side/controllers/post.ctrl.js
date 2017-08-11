const postModel = require('../model/mongoModel')

const DEFAULT_PAGE_INDEX = 1

const DEFAULT_PER_PAGE = 10

/**
 * @description
 * 返回所有文章
 * @export
 * @param {any} ctx
 */
exports.list = async ctx => {
    let collection = await postModel
        .Blog
        .listAll()
    return ctx.body = {
        code: '200',
        message: '成功获取',
        data: collection
    }
}

/**
 * 按页查找文章
 *
 * @param {any} ctx
 */
exports.fetchByPage = async ctx => {
    let {pageIdx, perPage} = ctx.request.query
    let collection = null
    let totalPost = 0
    try {
        collection = await postModel
            .Blog
            .fetchByPage(parseInt(pageIdx), parseInt(perPage))
        totalPost = await postModel
            .Blog
            .getTotalCount()
    } catch (error) {
        ctx.body = {
            code: '500',
            message: '查询错误'
        }
    }
    ctx.body = {
        code: '200',
        message: '查询成功',
        data: {
            "posts": collection,
            "Pagination": {
                "currentPage": pageIdx,
                "totalPage": Math.ceil(totalPost / perPage),
                "perPage": perPage
            }
        }

    }

}

/**
 * @description
 * 按照文章id返回文章
 * @param {any} ctx
 */
exports.findById = async ctx => {
    let res = {
        code: '200',
        message: '查找成功'
    }
    try {
        res.data = await postModel
            .Blog
            .findByPostId(ctx.params.id)
    } catch (error) {
        res = {
            code: '400',
            message: '查找失败，出现错误',
            data: error
        }
    }

    return ctx.body = res
}

/**
 * @description
 * 根据查询串提供的信息进行文章的查询
 * @param {any} ctx
 */
exports.findByQuery = async ctx => {
    let queryString = ctx.request.query || {}
    let queryMap = {
        id: undefined,
        title: undefined
    }
    let res = []
    let info = {
        code: "200",
        message: "已完成查询",
        data: []

    }
    Object
        .keys(queryString)
        .map((query) => {
            if (query in queryMap) {
                queryMap[query] = new RegExp(queryString[query])
            }
        })
    for (let i in queryMap) {
        if (typeof queryMap[i] != 'string') {
            delete queryMap[i]
        }
    }
    try {
        res = await postModel
            .Blog
            .find(queryMap)
            .exec()
    } catch (error) {

        return ctx.body = {
            code: '404',
            message: '模糊查询出错',
            data: error
        }
    }
    info.data = res
    return ctx.body = info
}

/**
 * @description
 * 新建文章
 * @param {any} ctx
 */
exports.create = async ctx => {
    let body = ctx.request.body
    let {title: title, content: content, tags} = body

    try {
        await postModel
            .Blog
            .createWithTags({title, content, tags})
        let collection = await postModel
            .Blog
            .listAll()
        return ctx.body = {
            code: '200',
            message: 'create success',
            data: collection
        }

    } catch (error) {
        ctx.body = {
            code: '404',
            message: error
        }
    }

}

/**
 * @description
 * 文章格式验证
 * @param {any} title
 * @param {any} content
 */
function postValid(title, content) {
    const TITLE_REG = '' //
}

/**
 * @description
 * 更新文章
 * @param {any} ctx
 */
exports.update = async ctx => {
    let body = ctx.request.body
    let {title: title, content: content} = body
    let doc = null
    try {
        doc = await postModel
            .Blog
            .findOneAndUpdate({
                id: ctx.params.id
            }, {
                $set: {
                    title: title,
                    content: content
                }
            })
            .exec()
        if (doc == null) {
            throw new Error('没有找到该文档')
        }
    } catch (error) {
        return ctx.body = {
            code: '404',
            message: '更新失败',
            data: error
        }
    }
    return ctx.body = {
        code: '200',
        message: '更新成功',
        data: doc
    }
}

/**
 * @description
 * 删除文章
 * @param {any} ctx
 */
exports.del = async ctx => {
    try {
        ctx.body = await postModel
            .Blog
            .findOneAndRemove({id: ctx.params.id})
            .exec()
    } catch (error) {
        ctx.body = error
    }
}
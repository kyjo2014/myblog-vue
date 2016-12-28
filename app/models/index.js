/**
 *往数据库中注册表
 */
var fs = require('fs')//node 文件读取模块
var path = require('path')//node 路径解析模块
var mysql = require('mysql');
var dbconfig = require('../../config/dev')

var basename = path.basename(module.filename)//避免循环依赖自身
var db = {}//数据库模式
const connection = mysql.createPool(dbconfig);


//初始化数据库信息
// dbinit(connection)

/**
 *获取所有表的格式
 */
fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach((file) => {

        db[file.slice(0, -3)] = require(path.join(__dirname, file))
    })


console.log(db)



/**
 * 
 * 
 * @param {String} newtable
 * @param {Set} existTable
 */
function checkReference(newtable, existTable) {
    let tableArray = newtable.split(" ")
    let length = tableArray.length
    let reg = new RegExp("referen", "i")
    for (let i = 0; i < length; i++) {
        if (reg.test(tableArray[i])) {
            return tableArray[i + 1]
        }

    }
    return null
}




/**
 * 初始化数据库
 * 
 * @param {any} connection 数据库的链接
 */
function init() {
    var table = null;
    let existTable = new Set();
    let toBuildList = []
    try {
        connection.query("show tables", (err, result) => {
            result.forEach((tablename) => {
                existTable.add(tablename[Object.keys(tablename)])
            })

            for (table in db) {
                if (typeof db[table] == "String" && !existTable.has(table)) {
                    var referen = checkReference(db[table].proper)
                    if (referen && !existTable.has(referen)) {
                        db[table].ref = referen
                        toBuildList.push(db[table])
                    } else {
                        connection.query("create table " + table + " (" + db[table].proper + ")", (err) => {
                            console.log(err)
                        })
                    }
                }
            }
            while (toBuildList.length) {
                var cur = toBuildList.pop()
                if (!existTable.has(cur.ref)) {
                    toBuildList.unshift()
                } else {
                    connection.query("create table " + table + " (" + db[table].proper + ")", (err) => {
                        console.log(err)
                    })
                }
            }

        })
    } catch (e) {

    }
    db['connection'] = connection
    return db
}

module.exports = init()
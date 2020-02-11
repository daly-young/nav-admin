const path = require('path')
import Koa from 'koa'
const convert = require('koa-convert')
const views = require('koa-views')
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
const koaLogger = require('koa-logger')
const session = require('koa-session')
const config = require('./../config')
const routers = require('./routers/index')
const mongoose = require('mongoose');
const koaCors = require('koa2-cors');

const app = new Koa()
//配置cors 跨域
app.use(koaCors())
/**
 * mongoose连接数据库
 * @type {[type]}
 */
mongoose.Promise = require('bluebird')
mongoose.connect(config.mongodb.url)

// session存储配置
//const sessionMysqlConfig= {
//user: config.database.USERNAME,
//password: config.database.PASSWORD,
//database: config.database.DATABASE,
//host: config.database.HOST,
//}

//// 配置session中间件
//app.use(session({
//key: 'USER_SID',
//store: new MysqlStore(sessionMysqlConfig)
//}))

//配置session中间件
app.use(session(app))
// 配置控制台日志中间件
app.use(koaLogger())
// 配置ctx.body解析中间件
app.use(bodyParser())

// 配置静态资源加载中间件
app.use(koaStatic(
    path.join(__dirname, './../client/dist')
))

// 配置服务端模板渲染引擎中间件
//app.use(views(path.join(__dirname, './views'), {
//extension: 'ejs'
//}))

// 初始化路由中间件
app.use(routers.routes()).use(routers.allowedMethods())

// 监听启动端口
app.listen(config.port)
console.log(`the server is start at port ${config.port}`)

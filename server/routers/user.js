/**
 * restful api 子路由
 */

const router = require('koa-router')()
const userController = require('./../controllers/user')

const routers = router
    //登陆
    .post('/login', userController.login)
    //注册
    .post('/register', userController.register)
    //getPower
    .post('/getPower', userController.getPower)

module.exports = routers

/**
 * restful api 子路由
 * 分类相关的
 */

const router = require('koa-router')()
const categoryController = require('./../controllers/category')

const common = require('./../controllers/common');


const routers = router
    //新增
    .post('/add', common.isLogin, categoryController.add)
    //编辑
    .post('/edit', common.isLogin, categoryController.edit)
    .post('/del', common.isLogin, categoryController.del)
    .get('/findAll', common.isLogin, categoryController.findAll)

module.exports = routers
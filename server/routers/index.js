/**
 * 整合所有子路由
 */

const router = require('koa-router')()

const nav = require('./nav')
const user = require('./user')
const category = require('./category')

router.use('/nav', nav.routes(), nav.allowedMethods())
router.use('/user', user.routes(), user.allowedMethods())
router.use('/cate', category.routes(), category.allowedMethods())

module.exports = router



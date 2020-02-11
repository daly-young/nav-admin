'use strict'

const Nav = require('../models/nav');

module.exports = {
    /**
     * 添加新导航
     */
    async add(ctx, next) {
        let title = ctx.request.body.title.trim()
        let content = ctx.request.body.content.trim()
        let categoryId = ctx.request.body.categoryId

        let result = {
            success: false,
            errCode: 0,
        }

        if (!categoryId) {
            result.errCode = -2
            result.errMsg = '导航分类不能为空！'
            ctx.body = result
            return
        }
        if (!title) {
            result.errCode = -3
            result.errMsg = '导航标题不能为空！'
            ctx.body = result
            return
        }
        if (!content) {
            result.errCode = -4
            result.errMsg = '导航内容不能为空！'
            ctx.body = result
            return
        }

        let nav = new Nav({
            title,
            content,
            categoryId,
            createAt: +Date.now(),
            updateAt: +Date.now()
        })

        try {
            //写入数据库
            nav = await nav.save()

            result.success = true
            result.data = nav
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -1
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    // 编辑
    async edit(ctx, next) {
        let title = ctx.request.body.title.trim()
        let content = ctx.request.body.content.trim()
        let navId = ctx.request.body._id

        let result = {
            success: false,
            errCode: 0,
        }

        if (!navId) {
            result.errCode = -2
            result.errMsg = '要编辑的导航id不能为空！'
            ctx.body = result
            return
        }
        if (!title) {
            result.errCode = -3
            result.errMsg = '导航标题不能为空！'
            ctx.body = result
            return
        }
        if (!content) {
            result.errCode = -4
            result.errMsg = '导航内容不能为空！'
            ctx.body = result
            return
        }


        try {
            //写入数据库
            let nav = await Nav.update({ _id: navId }, {
                title,
                content,
                updateAt: +Date.now()
            })

            result.success = true
            result.data = nav
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -1
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    /**
     * 删除链接
     * 需要传当前链接id
     */
    async del(ctx, next) {
        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        let userId = ctx.cookies.get('userId')
        let categoryId = ctx.request.body.categoryId
        let navId = ctx.request.body.navId
        if (!categoryId && !navId) {
            result.errCode = -2
            result.errMsg = '导航分类不能为空！'
            ctx.body = result
            return
        }

        try {
            //从数据库删除数据
            let param = categoryId ? { categoryId } : { _id: navId }
            let state = await Nav.remove(param)

            result.success = true
            result.data = state
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -1
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    /**
     * 查找全部
     * 需要传当前类目ID
     */
    async findAll(ctx, next) {
        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        let categoryId = ctx.request.query.categoryId
        if (!categoryId) {
            result.errCode = -2
            result.errMsg = '导航分类不能为空！'
            ctx.body = result
            return
        }

        try {
            //查询全部
            let navList = await Nav.find({ categoryId }).sort({ updateAt: -1 })
            console.log(result, '--------------------------2')
            result.success = true
            result.data = navList
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -1
            result.errMsg = e
            ctx.body = result
            return next
        }
    }
}

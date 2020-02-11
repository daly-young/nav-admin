'use strict'


const Category = require('../models/category');
const Nav = require('../models/nav');

module.exports = {
    /**
     * 添加分类
     * isPublic 用来判断是否有权限 添加公有的  1= 公有，0= 私有
     */
    async add(ctx, next) {
        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        //从cookie 中取userId 有 证明登陆了
        let userId = ctx.cookies.get('userId')
        let isPublic = ctx.request.body.isPublic
        let name = ctx.request.body.name.trim()

        let category = await Category.findOne({
            name,
            userId,
            isPublic
        })

        //判断本用户名是否有重复 的分类
        if (category) {
            result.errCode = -9
            result.errMsg = '有重复的分类名了！'
            ctx.body = result
            return

        }

        if (isPublic != 0 && isPublic != 1) {
            result.errCode = -2
            result.errMsg = '这个可能是公有的，定义好！'
            ctx.body = result
            return
        }
        if (!name) {
            result.errCode = -3
            result.errMsg = '名称不能不写！'
            ctx.body = result
            return
        }

        category = new Category({
            userId,
            name,
            isPublic,
            createAt: +Date.now(),
            updateAt: +Date.now()
        })

        try {
            //写入数据库
            category = await category.save()

            result.success = true
            result.data = category
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -999
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    /**
     * 更新分类
     * 需要传 分类ID 和 内容
     */
    async edit(ctx, next) {
        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        //从cookie 中取userId 有 证明登陆了
        let userId = ctx.cookies.get('userId')
        let categoryId = ctx.request.body._id
        let name = ctx.request.body.name.trim()

        //判断本分类ID是否存在
        if (!categoryId) {
            result.errCode = -9
            result.errMsg = '分类ID没传！'
            ctx.body = result
            return
        }

        if (!name) {
            result.errCode = -3
            result.errMsg = '名称不能不写！'
            ctx.body = result
            return
        }

        try {
            //写入数据库
            let category = await Category.update({ _id: categoryId }, {
                userId,
                name,
                updateAt: +Date.now()
            })

            result.success = true
            result.data = category
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -999
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    /**
     * 删除分类
     * 需要传 分类ID
     */
    async del(ctx, next) {
        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        let categoryId = ctx.request.body.categoryId
        //判断本分类ID是否存在
        if (!categoryId) {
            result.errCode = -9
            result.errMsg = '分类ID没传！'
            ctx.body = result
            return
        }
        try {
            //从数据库删除数据
            console.log(categoryId, '==========categoryId')
            let status = await Category.remove({ _id: categoryId })
            status = await Nav.remove({ categoryId })

            result.success = true
            result.data = status
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -999
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
    /**
     * 查询所有分类
     */
    async findAll(ctx, next) {

        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }
        //从cookie 中取userId 有 证明登陆了
        let userId = ctx.cookies.get('userId')
        //get 请求 用 ctx.request.query
        let isPublic = ctx.request.query.isPublic

        if (isPublic != 0 && isPublic != 1) {
            result.errCode = -2
            result.errMsg = '无法区分是公有还是私有！'
            ctx.body = result
            return
        }

        //根据 公有还是私有 区分查询不同的分类
        let prams = null
        if (isPublic == 1) {
            prams = { isPublic }
        } else {
            prams = { isPublic, userId }
        }

        try {
            //查询本公有或者私有下面所有分类

            let categoryList = await Category.find(prams).sort({ updateAt: -1 })

            result.success = true
            result.data = categoryList
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -999
            result.errMsg = e
            ctx.body = result
            return next
        }
    },
}

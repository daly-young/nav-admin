'use strict'

const User = require('../models/user');

module.exports = {
    /**
     * 注册新用户
     */
    async register(ctx, next) {
        let username = ctx.request.body.username.trim()
        let password = ctx.request.body.password
        let result = {
            success: false,
            errCode: 0,
        }

        if (!username) {
            result.errCode = -3
            result.errMsg = '用户名不能为空！'
            ctx.body = result
            return
        }
        if (!password) {
            result.errCode = -4
            result.errMsg = '密码不能为空！'
            ctx.body = result
            return
        }
        //根据用户名查询
        let user = await User.findOne({
            username
        }).exec()
        //      let user = userServices.findByUserName({username})
        //      console.log('user 是否重名！！', user);

        //判断用户是否存在
        if (!user) {

            user = new User({
                username,
                password
            })

        } else {
            //用户已经存在
            result.errCode = -1
            result.errMsg = '用户名重复了！请换一个！'
            ctx.body = result
            return
        }
        // console.log('user == ', user)
        try {
            //写入数据库
            user = await user.save()
            //          user = userServices.addUser(user)

            ctx.cookies.set("userId", user._id, {
                maxAge: 365 * 24 * 60 * 60 * 1000
            })

            result.success = true
            result.data = user
            ctx.body = result
        } catch (e) {
            console.log('md,err==', e)
            result.errCode = -2
            result.errMsg = e
            ctx.body = result
            return next
        }
    },

    /**
     * 登录
     */
    async login(ctx, next) {
        let username = ctx.request.body.username.trim()
        let password = ctx.request.body.password
        // console.log('username ==> ', username)
        // console.log('password ==> ', password)
        //根据用户名查询
        let user = await User.findOne({
            username,
            password
        })
        //      let user =  userServices.findByUserNameAndPassword({username,password})

        // console.log('user---login--->', user)

        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }

        //判断用户是否存在
        if (!user) {
            //不存在报错
            result.errMsg = '用户名或密码不正确，请重试'
            result.errCode = -1
            ctx.body = result
            return

        } else {
            //存在，登陆 然后写入cookie
            result.success = true
            result.data = user
            ctx.body = result
            //存cookie 1年有效期
            ctx.cookies.set("userId", user._id, {
                maxAge: 365 * 24 * 60 * 60 * 1000
            })
        }
    },
    /**
     * 获取权限
     */
    async getPower(ctx, next) {

        let result = {
            success: false,
            errCode: 0,
            errMsg: ""
        }

        //从cookie 中取userId 有证明登陆了
        let userId = ctx.cookies.get('userId')

        //不存在报错
        if (!userId) {
            result.errMsg = '用户名未登录，请先登陆'
            result.errCode = -1
            ctx.body = result
            return
        }
        // console.log('userId---getPower--->', userId)

        //根据用户Id查询
        let user = await User.findOne({
            _id: userId
        }).exec()
        //      let user =  userServices.findByUserNameAndPassword({username,password})

        // console.log('user---getPower--->', user)

        //判断用户是否存在
        if (!user) {
            //不存在报错
            result.errMsg = '用户信息有误，查询权限异常！'
            result.errCode = -1
            ctx.body = result
            return

        } else {
            result.success = true
            result.isPower = user.isPower
            ctx.body = result
            //存cookie 1年有效期
        }

    },
    /**
     * test
     */
    async test(ctx, next) {

        let result = {
            success: false,
            errCode: 0,
        }

        //存在，登陆 然后写入cookie
        result.success = true
        ctx.body = result
        //重定向
        ctx.redirect('../test.html')
    }
}

///**
// * 更新用户信息操作
// * @param  {[type]}   ctx  [description]
// * @param  {Function} next [description]
// * @return {[type]}        [description]
// */
//exports.update = async(ctx, next) => {
//  let body = ctx.request.body
//  let user = ctx.session.user
//
//  let fields = 'userName,password,nickname'.split(',')
//
//  fields.forEach(function(field) {
//      if(body[field]) {
//          user[field] = body[field].trim()
//      }
//  })
//
//  user = await user.save()
//
//  ctx.body = {
//      success: true,
//      data: user
//  }
//}

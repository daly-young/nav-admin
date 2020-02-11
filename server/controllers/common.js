'use strict'

// 用于封装controllers的公共方法

/**
 * 判断是否登录
 */
exports.isLogin = async(ctx, next) => {
    //从cookie 中取userId 有 证明登陆了
    let userId = ctx.cookies.get('userId')
    console.log(userId, '==---------------------userId')
    let result = {
        success: false,
        errCode: 0,
        errMsg: ""
    }

    //不存在报错 TODO
    if (!userId) {
        result.errMsg = '用户名未登录，请先登陆'
        result.errCode = -1
        ctx.body = result
        return next
    }

    await next()
}

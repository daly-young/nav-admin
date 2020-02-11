'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
    userId: String,
    isPublic: String, //1=公有，0=私有
    name: String,
    createAt: {
        type: Date,
        dafault: +Date.now()
    },
    updateAt: {
        type: Date,
        dafault: +Date.now()
    }
})

//// save方法回调 增加添加时间字段 和 权限
// CategorySchema.pre('update', function(next) {
//     if (this.isNew) {
//         this.createAt = this.updateAt = Date.now()
//     } else {
//         this.updateAt = Date.now()
//     }
//     next()
// })

/**
 * 定义模型Category
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数Category 数据库中的集合名称, 不存在会创建.
const Category = mongoose.model('Category', CategorySchema)

module.exports = Category

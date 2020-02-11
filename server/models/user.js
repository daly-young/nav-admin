'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
/**
 * 定义一个模式(相当于传统意义的表结构)
 * 每个模式映射mongoDB的一个集合，
 * 它定义（只是定义，不是实现）这个集合里面文档的结构，就是定义这个文档有什么字段，字段类型是什么，字段默认值是什么等。
 * 除了定义结构外，还定义文档的实例方法，静态模型方法，复合索引，中间件等
 * @type {mongoose}
 */
const UserSchema = new Schema({
//	: { type: ObjectId, required: true },
	username: {
		unique: true,
		type: String
	},
	password: String,
	isPower: {type:Number, default:0},
	createAt: {
		type: Date,
		dafault: Date.now()
	}
})

//// save 增加添加时间字段 和 权限
//UserSchema.pre('save', function(next) {
//	this.createAt = Date.now()
//	next()
//})

/**
 * 定义模型User
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数User 数据库中的集合名称, 不存在会创建.
const User = mongoose.model('User', UserSchema)

module.exports = User

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const NavSchema = new Schema({
	//	: { type: ObjectId, required: true },
	title: {
		type: String
	},
	content: String,
	categoryId: String,
	createAt: {
		type: Date,
		dafault: Date.now()
	},
	updateAt: {
		type: Date,
		dafault: Date.now()
	}
})

//// save 增加添加时间字段 和 权限
//NavSchema.pre('save', function(next) {
//	if(this.isNew) {
//		this.createAt = this.updateAt = Date.now()
//	} else {
//		this.updateAt = Date.now()
//	}
//	next()
//})

/**
 * 定义模型Nav
 * 模型用来实现我们定义的模式，调用mongoose.model来编译Schema得到Model
 * @type {[type]}
 */
// 参数Nav 数据库中的集合名称, 不存在会创建.
const Nav = mongoose.model('Nav', NavSchema)

module.exports = Nav
require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(1);
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
});

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
const Nav = mongoose.model('Nav', NavSchema);

module.exports = Nav;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 用于封装controllers的公共方法

/**
 * 判断是否登录
 */

exports.isLogin = async (ctx, next) => {
    //从cookie 中取userId 有 证明登陆了
    let userId = ctx.cookies.get('userId');
    console.log(userId, '==---------------------userId');
    let result = {
        success: false,
        errCode: 0,
        errMsg: ""

        //不存在报错 TODO
    };if (!userId) {
        result.errMsg = '用户名未登录，请先登陆';
        result.errCode = -1;
        ctx.body = result;
        return next;
    }

    await next();
};

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_static__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_bodyparser__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_bodyparser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_bodyparser__);

//import cors from '@koa/cors'
const path = __webpack_require__(6);

const convert = __webpack_require__(8);
const views = __webpack_require__(15);


const koaLogger = __webpack_require__(18);
const session = __webpack_require__(19);
const config = __webpack_require__(20);
const routers = __webpack_require__(21);
const mongoose = __webpack_require__(1);
const koaCors = __webpack_require__(30);

async function start() {
	const host = process.env.HOST || config.app.host;
	const port = process.env.PORT || config.app.port;
	const app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();
	//配置cors 跨域
	app.use(koaCors());

	/**
  * mongoose连接数据库
  * @type {[type]}
  */
	mongoose.Promise = __webpack_require__(31);
	mongoose.connect(config.mongodb.url);

	// session存储配置
	//const sessionMysqlConfig= {
	//user: config.database.USERNAME,
	//password: config.database.PASSWORD,
	//database: config.database.DATABASE,
	//host: config.database.HOST,
	//}

	//// 配置session中间件
	//app.use(session({
	//key: 'USER_SID',
	//store: new MysqlStore(sessionMysqlConfig)
	//}))

	//配置session中间件
	app.use(session(app));
	// 配置控制台日志中间件
	app.use(koaLogger());
	// 配置ctx.body解析中间件
	app.use(__WEBPACK_IMPORTED_MODULE_3_koa_bodyparser___default()());

	// 配置静态资源加载中间件
	app.use(__WEBPACK_IMPORTED_MODULE_2_koa_static___default()(path.join(__dirname, './../client/dist')));

	// 配置服务端模板渲染引擎中间件
	//app.use(views(path.join(__dirname, './views'), {
	//extension: 'ejs'
	//}))

	// 初始化路由中间件
	app.use(routers.routes()).use(routers.allowedMethods());

	// Import and Set Nuxt.js options
	let nuxtConfig = __webpack_require__(32);
	nuxtConfig.dev = !(app.env === 'production');

	// Instantiate nuxt.js
	const nuxt = new __WEBPACK_IMPORTED_MODULE_0_nuxt__["Nuxt"](nuxtConfig);

	// Build in development
	if (nuxtConfig.dev) {
		const builder = new __WEBPACK_IMPORTED_MODULE_0_nuxt__["Builder"](nuxt);
		await builder.build();
	}

	app.use(async (ctx, next) => {
		await next();
		ctx.status = 200; // koa defaults to 404 when it sees that status is unset
		return new Promise((resolve, reject) => {
			ctx.res.on('close', resolve);
			ctx.res.on('finish', resolve);
			nuxt.render(ctx.req, ctx.res, promise => {
				// nuxt.render passes a rejected promise into callback on error.
				promise.then(resolve).catch(reject);
			});
		});
	});

	// 监听启动端口
	//	app.listen(config.port)
	//	console.log(`the server is start at port ${config.port}`)
	app.listen(port, host);
	console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console
}

start();
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, "server"))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const co = __webpack_require__(9)
const compose = __webpack_require__(10)

module.exports = convert

function convert (mw) {
  if (typeof mw !== 'function') {
    throw new TypeError('middleware must be a function')
  }
  if (mw.constructor.name !== 'GeneratorFunction') {
    // assume it's Promise-based middleware
    return mw
  }
  const converted = function (ctx, next) {
    return co.call(ctx, mw.call(ctx, createGenerator(next)))
  }
  converted._name = mw._name || mw.name
  return converted
}

function * createGenerator (next) {
  return yield next()
}

// convert.compose(mw, mw, mw)
// convert.compose([mw, mw, mw])
convert.compose = function (arr) {
  if (!Array.isArray(arr)) {
    arr = Array.from(arguments)
  }
  return compose(arr.map(convert))
}

convert.back = function (mw) {
  if (typeof mw !== 'function') {
    throw new TypeError('middleware must be a function')
  }
  if (mw.constructor.name === 'GeneratorFunction') {
    // assume it's generator middleware
    return mw
  }
  const converted = function * (next) {
    let ctx = this
    let called = false
    // no need try...catch here, it's ok even `mw()` throw exception
    yield Promise.resolve(mw(ctx, function () {
      if (called) {
        // guard against multiple next() calls
        // https://github.com/koajs/compose/blob/4e3e96baf58b817d71bd44a8c0d78bb42623aa95/index.js#L36
        return Promise.reject(new Error('next() called multiple times'))
      }
      called = true
      return co.call(ctx, next)
    }))
  }
  converted._name = mw._name || mw.name
  return converted
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("co");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Promise = __webpack_require__(11)

/**
 * Expose compositor.
 */

module.exports = compose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, function next () {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12)().Promise


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = __webpack_require__(13)(global, loadImplementation);

/**
 * Node.js version of loadImplementation.
 *
 * Requires the given implementation and returns the registration
 * containing {Promise, implementation}
 *
 * If implementation is undefined or global.Promise, loads it
 * Otherwise uses require
 */
function loadImplementation(implementation){
  var impl = null

  if(shouldPreferGlobalPromise(implementation)){
    // if no implementation or env specified use global.Promise
    impl = {
      Promise: global.Promise,
      implementation: 'global.Promise'
    }
  } else if(implementation){
    // if implementation specified, require it
    var lib = !(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())
    impl = {
      Promise: lib.Promise || lib,
      implementation: implementation
    }
  } else {
    // try to auto detect implementation. This is non-deterministic
    // and should prefer other branches, but this is our last chance
    // to load something without throwing error
    impl = tryAutoDetect()
  }

  if(impl === null){
    throw new Error('Cannot find any-promise implementation nor'+
      ' global.Promise. You must install polyfill or call'+
      ' require("any-promise/register") with your preferred'+
      ' implementation, e.g. require("any-promise/register/bluebird")'+
      ' on application load prior to any require("any-promise").')
  }

  return impl
}

/**
 * Determines if the global.Promise should be preferred if an implementation
 * has not been registered.
 */
function shouldPreferGlobalPromise(implementation){
  if(implementation){
    return implementation === 'global.Promise'
  } else if(typeof global.Promise !== 'undefined'){
    // Load global promise if implementation not specified
    // Versions < 0.11 did not have global Promise
    // Do not use for version < 0.12 as version 0.11 contained buggy versions
    var version = (/v(\d+)\.(\d+)\.(\d+)/).exec(process.version)
    return !(version && +version[1] == 0 && +version[2] < 12)
  }

  // do not have global.Promise or another implementation was specified
  return false
}

/**
 * Look for common libs as last resort there is no guarantee that
 * this will return a desired implementation or even be deterministic.
 * The priority is also nearly arbitrary. We are only doing this
 * for older versions of Node.js <0.12 that do not have a reasonable
 * global.Promise implementation and we the user has not registered
 * the preference. This preserves the behavior of any-promise <= 0.1
 * and may be deprecated or removed in the future
 */
function tryAutoDetect(){
  var libs = [
      "es6-promise",
      "promise",
      "native-promise-only",
      "bluebird",
      "rsvp",
      "when",
      "q",
      "pinkie",
      "lie",
      "vow"]
  var i = 0, len = libs.length
  for(; i < len; i++){
    try {
      return loadImplementation(libs[i])
    } catch(e){}
  }
  return null
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

    // global key for user preferred registration
var REGISTRATION_KEY = '@@any-promise/REGISTRATION',
    // Prior registration (preferred or detected)
    registered = null

/**
 * Registers the given implementation.  An implementation must
 * be registered prior to any call to `require("any-promise")`,
 * typically on application load.
 *
 * If called with no arguments, will return registration in
 * following priority:
 *
 * For Node.js:
 *
 * 1. Previous registration
 * 2. global.Promise if node.js version >= 0.12
 * 3. Auto detected promise based on first sucessful require of
 *    known promise libraries. Note this is a last resort, as the
 *    loaded library is non-deterministic. node.js >= 0.12 will
 *    always use global.Promise over this priority list.
 * 4. Throws error.
 *
 * For Browser:
 *
 * 1. Previous registration
 * 2. window.Promise
 * 3. Throws error.
 *
 * Options:
 *
 * Promise: Desired Promise constructor
 * global: Boolean - Should the registration be cached in a global variable to
 * allow cross dependency/bundle registration?  (default true)
 */
module.exports = function(root, loadImplementation){
  return function register(implementation, opts){
    implementation = implementation || null
    opts = opts || {}
    // global registration unless explicitly  {global: false} in options (default true)
    var registerGlobal = opts.global !== false;

    // load any previous global registration
    if(registered === null && registerGlobal){
      registered = root[REGISTRATION_KEY] || null
    }

    if(registered !== null
        && implementation !== null
        && registered.implementation !== implementation){
      // Throw error if attempting to redefine implementation
      throw new Error('any-promise already defined as "'+registered.implementation+
        '".  You can only register an implementation before the first '+
        ' call to require("any-promise") and an implementation cannot be changed')
    }

    if(registered === null){
      // use provided implementation
      if(implementation !== null && typeof opts.Promise !== 'undefined'){
        registered = {
          Promise: opts.Promise,
          implementation: implementation
        }
      } else {
        // require implementation if implementation is specified but not provided
        registered = loadImplementation(implementation)
      }

      if(registerGlobal){
        // register preference globally in case multiple installations
        root[REGISTRATION_KEY] = registered
      }
    }

    return registered
  }
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("koa-views");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("koa-static");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

const config = {
	port: 2018,
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/admin_nav'
	},
	app: {
		host: '127.0.0.1',
		port: 2018,
		routerBaseApi: 'api'
	}
};

module.exports = config;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 整合所有子路由
 */

const router = __webpack_require__(0)();

const nav = __webpack_require__(22);
const user = __webpack_require__(24);
const category = __webpack_require__(27);

router.use('/nav', nav.routes(), nav.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());
router.use('/cate', category.routes(), category.allowedMethods());

module.exports = router;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * restful api 子路由
 * 导航相关
 */

const router = __webpack_require__(0)();
const navController = __webpack_require__(23);

const common = __webpack_require__(3);

const routers = router
//新增
.post('/add', common.isLogin, navController.add).post('/edit', common.isLogin, navController.edit).post('/del', common.isLogin, navController.del).get('/findAll', common.isLogin, navController.findAll);

module.exports = routers;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Nav = __webpack_require__(2);

module.exports = {
    /**
     * 添加新导航
     */
    async add(ctx, next) {
        let title = ctx.request.body.title.trim();
        let content = ctx.request.body.content.trim();
        let categoryId = ctx.request.body.categoryId;

        let result = {
            success: false,
            errCode: 0
        };

        if (!categoryId) {
            result.errCode = -2;
            result.errMsg = '导航分类不能为空！';
            ctx.body = result;
            return;
        }
        if (!title) {
            result.errCode = -3;
            result.errMsg = '导航标题不能为空！';
            ctx.body = result;
            return;
        }
        if (!content) {
            result.errCode = -4;
            result.errMsg = '导航内容不能为空！';
            ctx.body = result;
            return;
        }

        let nav = new Nav({
            title,
            content,
            categoryId,
            createAt: +Date.now(),
            updateAt: +Date.now()
        });

        try {
            //写入数据库
            nav = await nav.save();

            result.success = true;
            result.data = nav;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -1;
            result.errMsg = e;
            ctx.body = result;
            return next;
        }
    },
    // 编辑
    async edit(ctx, next) {
        let title = ctx.request.body.title.trim();
        let content = ctx.request.body.content.trim();
        let navId = ctx.request.body._id;

        let result = {
            success: false,
            errCode: 0
        };

        if (!navId) {
            result.errCode = -2;
            result.errMsg = '要编辑的导航id不能为空！';
            ctx.body = result;
            return;
        }
        if (!title) {
            result.errCode = -3;
            result.errMsg = '导航标题不能为空！';
            ctx.body = result;
            return;
        }
        if (!content) {
            result.errCode = -4;
            result.errMsg = '导航内容不能为空！';
            ctx.body = result;
            return;
        }

        try {
            //写入数据库
            let nav = await Nav.update({ _id: navId }, {
                title,
                content,
                updateAt: +Date.now()
            });

            result.success = true;
            result.data = nav;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -1;
            result.errMsg = e;
            ctx.body = result;
            return next;
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
        };
        let userId = ctx.cookies.get('userId');
        let categoryId = ctx.request.body.categoryId;
        let navId = ctx.request.body.navId;
        if (!categoryId && !navId) {
            result.errCode = -2;
            result.errMsg = '导航分类不能为空！';
            ctx.body = result;
            return;
        }

        try {
            //从数据库删除数据
            let param = categoryId ? { categoryId } : { _id: navId };
            let state = await Nav.remove(param);

            result.success = true;
            result.data = state;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -1;
            result.errMsg = e;
            ctx.body = result;
            return next;
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
        };
        let categoryId = ctx.request.query.categoryId;
        if (!categoryId) {
            result.errCode = -2;
            result.errMsg = '导航分类不能为空！';
            ctx.body = result;
            return;
        }

        try {
            //查询全部
            let navList = await Nav.find({ categoryId }).sort({ updateAt: -1 });
            console.log(result, '--------------------------2');
            result.success = true;
            result.data = navList;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -1;
            result.errMsg = e;
            ctx.body = result;
            return next;
        }
    }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * restful api 子路由
 */

const router = __webpack_require__(0)();
const userController = __webpack_require__(25);

const routers = router
//登陆
.post('/login', userController.login)
//注册
.post('/register', userController.register)
//getPower
.post('/getPower', userController.getPower);

module.exports = routers;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const User = __webpack_require__(26);

module.exports = {
    /**
     * 注册新用户
     */
    async register(ctx, next) {
        let username = ctx.request.body.username.trim();
        let password = ctx.request.body.password;
        let result = {
            success: false,
            errCode: 0
        };

        if (!username) {
            result.errCode = -3;
            result.errMsg = '用户名不能为空！';
            ctx.body = result;
            return;
        }
        if (!password) {
            result.errCode = -4;
            result.errMsg = '密码不能为空！';
            ctx.body = result;
            return;
        }
        //根据用户名查询
        let user = await User.findOne({
            username
        }).exec();
        //      let user = userServices.findByUserName({username})
        //      console.log('user 是否重名！！', user);

        //判断用户是否存在
        if (!user) {

            user = new User({
                username,
                password
            });
        } else {
            //用户已经存在
            result.errCode = -1;
            result.errMsg = '用户名重复了！请换一个！';
            ctx.body = result;
            return;
        }
        // console.log('user == ', user)
        try {
            //写入数据库
            user = await user.save();
            //          user = userServices.addUser(user)

            ctx.cookies.set("userId", user._id, {
                maxAge: 365 * 24 * 60 * 60 * 1000
            });

            result.success = true;
            result.data = user;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -2;
            result.errMsg = e;
            ctx.body = result;
            return next;
        }
    },

    /**
     * 登录
     */
    async login(ctx, next) {
        let username = ctx.request.body.username.trim();
        let password = ctx.request.body.password;
        // console.log('username ==> ', username)
        // console.log('password ==> ', password)
        //根据用户名查询
        let user = await User.findOne({
            username,
            password
        });
        //      let user =  userServices.findByUserNameAndPassword({username,password})

        // console.log('user---login--->', user)

        let result = {
            success: false,
            errCode: 0,
            errMsg: ""

            //判断用户是否存在
        };if (!user) {
            //不存在报错
            result.errMsg = '用户名或密码不正确，请重试';
            result.errCode = -1;
            ctx.body = result;
            return;
        } else {
            //存在，登陆 然后写入cookie
            result.success = true;
            result.data = user;
            ctx.body = result;
            //存cookie 1年有效期
            ctx.cookies.set("userId", user._id, {
                maxAge: 365 * 24 * 60 * 60 * 1000
            });
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

            //从cookie 中取userId 有证明登陆了
        };let userId = ctx.cookies.get('userId');

        //不存在报错
        if (!userId) {
            result.errMsg = '用户名未登录，请先登陆';
            result.errCode = -1;
            ctx.body = result;
            return;
        }
        // console.log('userId---getPower--->', userId)

        //根据用户Id查询
        let user = await User.findOne({
            _id: userId
        }).exec();
        //      let user =  userServices.findByUserNameAndPassword({username,password})

        // console.log('user---getPower--->', user)

        //判断用户是否存在
        if (!user) {
            //不存在报错
            result.errMsg = '用户信息有误，查询权限异常！';
            result.errCode = -1;
            ctx.body = result;
            return;
        } else {
            result.success = true;
            result.isPower = user.isPower;
            ctx.body = result;
            //存cookie 1年有效期
        }
    },
    /**
     * test
     */
    async test(ctx, next) {

        let result = {
            success: false,
            errCode: 0

            //存在，登陆 然后写入cookie
        };result.success = true;
        ctx.body = result;
        //重定向
        ctx.redirect('../test.html');
    }
};

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

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(1);
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
  isPower: { type: Number, default: 0 },
  createAt: {
    type: Date,
    dafault: Date.now()
  }
});

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
const User = mongoose.model('User', UserSchema);

module.exports = User;

/**
 * nodejs中文社区这篇帖子对mongoose的用法总结的不错：https://cnodejs.org/topic/548e54d157fd3ae46b233502
 */

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * restful api 子路由
 * 分类相关的
 */

const router = __webpack_require__(0)();
const categoryController = __webpack_require__(28);

const common = __webpack_require__(3);

const routers = router
//新增
.post('/add', common.isLogin, categoryController.add)
//编辑
.post('/edit', common.isLogin, categoryController.edit).post('/del', common.isLogin, categoryController.del).get('/findAll', common.isLogin, categoryController.findAll);

module.exports = routers;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Category = __webpack_require__(29);
const Nav = __webpack_require__(2);

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
            //从cookie 中取userId 有 证明登陆了
        };let userId = ctx.cookies.get('userId');
        let isPublic = ctx.request.body.isPublic;
        let name = ctx.request.body.name.trim();

        let category = await Category.findOne({
            name,
            userId,
            isPublic
        });

        //判断本用户名是否有重复 的分类
        if (category) {
            result.errCode = -9;
            result.errMsg = '有重复的分类名了！';
            ctx.body = result;
            return;
        }

        if (isPublic != 0 && isPublic != 1) {
            result.errCode = -2;
            result.errMsg = '这个可能是公有的，定义好！';
            ctx.body = result;
            return;
        }
        if (!name) {
            result.errCode = -3;
            result.errMsg = '名称不能不写！';
            ctx.body = result;
            return;
        }

        category = new Category({
            userId,
            name,
            isPublic,
            createAt: +Date.now(),
            updateAt: +Date.now()
        });

        try {
            //写入数据库
            category = await category.save();

            result.success = true;
            result.data = category;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -999;
            result.errMsg = e;
            ctx.body = result;
            return next;
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
            //从cookie 中取userId 有 证明登陆了
        };let userId = ctx.cookies.get('userId');
        let categoryId = ctx.request.body._id;
        let name = ctx.request.body.name.trim();

        //判断本分类ID是否存在
        if (!categoryId) {
            result.errCode = -9;
            result.errMsg = '分类ID没传！';
            ctx.body = result;
            return;
        }

        if (!name) {
            result.errCode = -3;
            result.errMsg = '名称不能不写！';
            ctx.body = result;
            return;
        }

        try {
            //写入数据库
            let category = await Category.update({ _id: categoryId }, {
                userId,
                name,
                updateAt: +Date.now()
            });

            result.success = true;
            result.data = category;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -999;
            result.errMsg = e;
            ctx.body = result;
            return next;
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
        };
        let categoryId = ctx.request.body.categoryId;
        //判断本分类ID是否存在
        if (!categoryId) {
            result.errCode = -9;
            result.errMsg = '分类ID没传！';
            ctx.body = result;
            return;
        }
        try {
            //从数据库删除数据
            console.log(categoryId, '==========categoryId');
            let status = await Category.remove({ _id: categoryId });
            status = await Nav.remove({ categoryId });

            result.success = true;
            result.data = status;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -999;
            result.errMsg = e;
            ctx.body = result;
            return next;
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
            //从cookie 中取userId 有 证明登陆了
        };let userId = ctx.cookies.get('userId');
        //get 请求 用 ctx.request.query
        let isPublic = ctx.request.query.isPublic;

        if (isPublic != 0 && isPublic != 1) {
            result.errCode = -2;
            result.errMsg = '无法区分是公有还是私有！';
            ctx.body = result;
            return;
        }

        //根据 公有还是私有 区分查询不同的分类
        let prams = null;
        if (isPublic == 1) {
            prams = { isPublic };
        } else {
            prams = { isPublic, userId };
        }

        try {
            //查询本公有或者私有下面所有分类

            let categoryList = await Category.find(prams).sort({ updateAt: -1 });

            result.success = true;
            result.data = categoryList;
            ctx.body = result;
        } catch (e) {
            console.log('md,err==', e);
            result.errCode = -999;
            result.errMsg = e;
            ctx.body = result;
            return next;
        }
    }
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mongoose = __webpack_require__(1);
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
});

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
const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("koa2-cors");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = {
	/*
  ** Headers of the page
  */
	head: {
		title: '导航系统',
		meta: [{
			charset: 'utf-8'
		}],
		//		script: [{
		//				src: 'https://g.alicdn.com/mtb/??lib-flexible/0.3.2/flexible_css.js,lib-flexible/0.3.2/flexible.js'
		//			},
		//		],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon.ico'
		}]
	},
	css: [],
	/*
  ** Customize the progress bar color
  */
	loading: {
		color: '#ffe600'
	},
	/*
  ** Build configuration
  */
	build: {
		vendor: ['axios']
		/*
   ** Run ESLint on save
   */
		//  extend (config, { isDev, isClient }) {
		//    if (isDev && isClient) {
		//      config.module.rules.push({
		//        enforce: 'pre',
		//        test: /\.(js|vue)$/,
		//        loader: 'eslint-loader',
		//        exclude: /(node_modules)/
		//      })
		//    }
		//  }
	},
	//	axios: {
	//		baseURL: 'http://vueh5.xueshanshan.top',
	//		credentials: false,
	//		proxyHeaders: false
	//	},
	postcss: function () {
		return [px2rem({
			remUnit: 75
		})];
	},
	modules: ['@nuxtjs/pwa', '@nuxtjs/axios'],
	plugins: ['~/plugins/components.js', '~/plugins/filters.js']
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map
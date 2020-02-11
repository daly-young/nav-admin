# 项目说明

基于node 实现简单的导航管理系统

>server端：使用node， koa + mongodb
>
>client端：为几个测试页面，用于测试


**mongodb请先安装和启动**
具体配置在 `./config.js`


**项目安装与启动**

```bash
1.安装 依赖
npm i

2.启动项目 【添加了修改自动重启功能】
npm run dev_server
```

默认端口开启2333
本地访问 http://localhost:2333/


项目说明：
项目中用到的数据实体：

```
*category*

id 唯一标识
name 名称
isPublic 是否公有 1=公有，0=私有
createAt 创建时间
updateAt 更新时间


*nav*
id 唯一标识
title 标题
content 内容
categoryId 对应的分类id
createAt 创建时间
updateAt 更新时间

*user*
id 唯一标识
username 用户名
password 密码
createAt 创建时间

```

关于登陆问题，使用的是cookie 校验，cookie中有userId 证明是登陆用户，否则为未登录用户。注册和登陆之后都会写入cookie。 所有需要登陆的，router中都做限制。
默认不用传userId

注意：分类删除时， 会把此分类下面所有的 ，导航删除掉 

项目中基本的后台校验都有

---

生产环境可以使用 pm2发布

全局安装pm2

```bash
npm i -g pm2
```

>记得修改 pm2.json 中的pwd属性为当前项目地址
>
>pm2具体使用方法自行百度


```bash
# --save
cnpm i @nuxtjs/axios @nuxtjs/pwa axios nuxt bluebird busboy co debug ejs koa koa-bodyparser koa-logger koa-router koa-send koa-session koa-static koa-views koa2-cors mongoose validator xss --save
# --save-dev
cnpm i babel-eslint babel-preset-latest-node babel-preset-stage-3 backpack-core eslint eslint-friendly-formatter eslint-loader eslint-plugin-vue node-sass less less-loader node-sass nodemon postcss postcss-px2rem sass-loader -D
```
const config = {
	port: 2018,
	mongodb: {
		url: 'mongodb://127.0.0.1:27017/admin_nav'
	},
	app: {
		//ip地址和localhost 都能访问
		host: '0.0.0.0',
		port: 2018,
		routerBaseApi: 'api'
	}
}

module.exports = config
module.exports = {
	devServer: {
		host: 'localhost',
		port: 8090,
		proxy: {
			'/api': {
				target: 'http://localhost:8080/baonuo_admin_war_exploded/api/',
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		}
	}
}

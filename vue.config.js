const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
	// devServer: {
	// 	host: 'localhost',
	// 	port: 8090,
	// 	proxy: {
	// 		'/api': {
	// 			target: 'http://localhost:8080/baonuo_admin_war_exploded/api/',
	// 			changeOrigin: true,
	// 			pathRewrite: {
	// 				'^/api': '/'
	// 			}
	// 		}
	// 	}
	// }

	chainWebpack(config) {
		// svg设置
		config.module
			.rule('svg')
			.exclude.add(resolve('src/icons'))
			.end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
			.end()

		if (process.env.NODE_ENV === 'production') {
			if (process.env.npm_config_report) {
				config
					.plugin('webpack-bundle-analyzer')
					.use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
					.end()
			}
		} else {}
	}
}

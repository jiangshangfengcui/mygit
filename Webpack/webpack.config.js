var webpack = require('webpack')

module.exports = {
	plugins: [
		/*
			使用 webpack 的 DefinePlugin 来指定生产环境，以便在压缩时可以让 UglifyJS 自动删除警告代码块
		*/
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: 'production'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	]
}
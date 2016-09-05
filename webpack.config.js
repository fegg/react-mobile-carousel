const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/app.js',

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},

	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		},{
			test: /\.(jpg|png)$/,
			loader: 'url'
		}]
	},

	devtool: 'eval-source-map',

	postcss: [autoprefixer],  // PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use

	resolve: {
		extensions: ['', '.js', '.jsx'],
		root: [
			path.resolve('./src')
		]
	},

	plugins: [

		new webpack.HotModuleReplacementPlugin(),

		// Assign the module and chunk ids by occurrence count. Ids that are used often get lower (shorter) ids. This make ids predictable, reduces total file size and is recommended.
		// preferEntry (boolean) give entry chunks higher priority. This make entry chunks smaller but increases the overall size. (recommended)
		// 给经常使用的模块分配最小长度的id
		new webpack.optimize.OccurenceOrderPlugin(),

	],

	devServer: {
		contentBase: './dist',
		historyApiFallback: true,
		hot: true,
		inline: true,
		progress: true,
	}
}
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["react", "env"],
						plugins: ["@babel/plugin-proposal-decorators", "@babel/plugin-proposal-class-properties"]
					}
				}
			}
		]
	},
	plugins: [
		new OpenBrowserPlugin({ url: 'http://localhost:2333' }),
		new HtmlWebpackPlugin({
			title: 'quick-start',
			template: 'index.html',
		}),
	]
}
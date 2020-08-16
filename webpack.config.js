const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'lib')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      }
    ]
  },
  devtool: false,
  devServer: {
    historyApiFallback:{
      index:'./index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: 'index.html',
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
    new webpack.SourceMapDevToolPlugin({})
  ]
}
/**
 * webpack dev config
 */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  module: {
    // loader 是一个消耗性能的大户
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // 静态资源
    contentBase: "./dist",
    // 是否打开浏览器
    open: true,
    // 端口
    port: 3000,
    // 是否使用本地ip
    // useLocalIp: true,
    // 是否允许外网ip访问
    // host: "0.0.0.0",
    // 代理
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    },
    // mock server webpack-dev-server 中间件的钩子函数 
    before(app, server) {
      app.get('/api/info', (req, res) => {
        res.json({
          name: 'dd'
        })
      })
    },
    hot: true,
    hotOnly: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'index.html',
      template: './src/index.html',
    }),
    // MiniCssExtractPlugin 对HMR支持不好
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(baseConfig, devConfig)
// webpack 基于nodeJS 符合commonJS规范 es module 规范 amd规范
const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: 'production',
  context: process.cwd(),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name]-[hash:6].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
// webpack 基于nodeJS 符合commonJS规范
const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 构建的模式 node development production
  mode: 'production',

  // 上下文 项目打包的相对路径 必须是绝对路径 一般不会动
  context: process.cwd(),

  // 入口 
  // 三种类型
  // 字符串
  entry: './src/index.js',
  // 数组 作拼接
  // entry: ['./src/index.js', './src/other.js'],
  // 对象 多入口的方式
  // 1.相等
  // entry: {
  //   main: './src/index.js',
  // }
  // entry:'./src/index.js'
  // 2.多入口对应着多出口，output使用占位符生成各自的filename
  // entry: {
  //   index: './src/index.js',
  //   other: './src/other.js',
  // },

  // 出口
  output: {
    // 构建的文件资源放哪 必须是绝对路径
    path: path.resolve(__dirname, './build'),
    // 构建的文件资源叫啥 无论是多出口还是单出口 都推荐使用占位符
    filename: '[name]-[hash:6].js'
  },

  // module 处理不认识的模块 webpack 默认只支持json和js模块
  module: {
    rules: [
      {
        test: /\.css$/,
        // loader 模块转换  执行顺序 从后往前
        /**
         * css-loader 将css模块的内容加入到js模块中去
         * css in js
         * 
         * style-loader 从js中提取css的loader 在html中创建style标签，将css内容加入到style标签中
         */
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules/'
      }
    ]
  },

  // plugin 插件机制 原理上是作用于整个webpack打包周期的 有生命周期的概念 在打包中 打包完成后做一些操作
  // 是对webpack的拓展和增强
  plugins: [
    new CleanWebpackPlugin()
  ]
}

/**
 * 占位符
 * name
 *
 * hash 整个项目的hash值 每次构建 都会生成一个新的hash
 * 默认20位 一般指定6位
 *
 * chunkhash
 * 多入口比较推荐
 *
 * id
 */
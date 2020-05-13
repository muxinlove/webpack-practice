const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: '[name]-[hash:6].js'
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: 'file-loader'
        use: {
          loader: 'url-loader',
          options: {
            // ext 后缀
            name: '[name]_[hash:6].[ext]',
            outputPath: 'images/',
            limit: 1024 * 10 // 单位为字节  小于这个限制 转为base64格式
          }
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            // ext 后缀
            name: '[name].[ext]',
            outputPath: 'webfont/'
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  devtool: "cheap-module-eval-source-map",
  devServer: {
    // 静态资源
    contentBase: "./dist",
    // 是否打开浏览器
    open: true,
    // 端口
    port: 3000,
    // 是否使用本地ip
    useLocalIp: true,
    // 是否允许外网ip访问
    host: "0.0.0.0"
  },
}
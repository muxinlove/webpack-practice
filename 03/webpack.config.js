const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const VueLoadPlugin = require('vue-loader/lib/plugin')

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
          // MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /.vue$/,
        use: [
          'vue-loader'
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
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: '[name].css'
    // }),
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'index.html',
      template: './src/index.html'
    }),
    // MiniCssExtractPlugin 对HMR支持不好
    new webpack.HotModuleReplacementPlugin(),

    new VueLoadPlugin()
  ],
  resolve: {
    alias: { 'vue': 'vue/dist/vue.js' }
  }
}
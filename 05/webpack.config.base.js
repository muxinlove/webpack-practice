/**
 * webpack base 配置
 */
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoadPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './src/index.js',
  module: {
    // loader 是一个消耗性能的大户
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        // use: 'file-loader'
        include: path.resolve(__dirname, "./src"),
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
        include: path.resolve(__dirname, "./src"),
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
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /.vue$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          'vue-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoadPlugin()
  ],
  resolve: {
    // 别名
    alias: {
      'vue': 'vue/dist/vue.js',
      "@": path.join(__dirname, "./src"),
      react: path.resolve(
        __dirname,
        "./node_modules/react/umd/react.production.min.js"
      ),
      "react-dom": path.resolve(
        __dirname,
        "./node_modules/react-dom/umd/react-dom.production.min.js"
      )
    },
    // 配置第三方模块路径
    modules: [
      path.resolve(__dirname, './node_modules')
    ],
    // 后缀尝试列表 尽量带上后缀
    extensions: ['.js', '.json', '.jsx', '.ts']
  },
  externals: {
    jquery: 'jQuery'
  }
}
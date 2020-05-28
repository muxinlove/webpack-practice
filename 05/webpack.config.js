const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const VueLoadPlugin = require('vue-loader/lib/plugin')

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const BundleAnalyzerPlugin = require('webpack-bundle-a nalyzer').BundleAnalyzerPlugin;

// css摇树
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')

const config = {
  mode: 'development',
  // mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    // filename: '[name]-[hash:6].js'
    filename: '[name].js',
    // 静态资源路径
    // publicPath: 'https://cdn.kaikeba.com/assets/'
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
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          // "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          "postcss-loader",
          "sass-loader"
        ]
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
  // devtool: "cheap-module-eval-source-map",
  // devServer: {
  //   // 静态资源
  //   contentBase: "./dist",
  //   // 是否打开浏览器
  //   open: true,
  //   // 端口
  //   port: 3000,
  //   // 是否使用本地ip
  //   // useLocalIp: true,
  //   // 是否允许外网ip访问
  //   // host: "0.0.0.0",
  //   // 代理
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:9092"
  //     }
  //   },
  //   // mock server webpack-dev-server 中间件的钩子函数 
  //   before(app, server) {
  //     app.get('/api/info', (req, res) => {
  //       res.json({
  //         name: 'dd'
  //       })
  //     })
  //   },
  //   hot: true,
  //   hotOnly: true
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'index.html',
      template: './src/index.html',
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   minifyCSS: true,
      // }
    }),
    // MiniCssExtractPlugin 对HMR支持不好
    // new webpack.HotModuleReplacementPlugin(),

    new VueLoadPlugin(),
    // new OptimizeCSSAssetsPlugin({
    //   // cssnano 默认的一套压缩配置选项 postcss的依赖项，可以不install，直接用
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: {
    //     discardComments: {
    //       removeAll: true
    //     }
    //   }
    // }),
    new PurifyCSS({
      paths: glob.sync([
        // 要做 CSS Tree Shaking 的路径⽂件
        path.resolve(__dirname, './src/*.html'),
        path.resolve(__dirname, './src/*.js')
      ])
    }),
    new BundleAnalyzerPlugin(),
  ],
  // resolve: {
  //   // 别名
  //   alias: {
  //     'vue': 'vue/dist/vue.js',
  //     "@": path.join(__dirname, "./src"),
  //     react: path.resolve(
  //       __dirname,
  //       "./node_modules/react/umd/react.production.min.js"
  //     ),
  //     "react-dom": path.resolve(
  //       __dirname,
  //       "./node_modules/react-dom/umd/react-dom.production.min.js"
  //     )
  //   },
  //   // 配置第三方模块路径
  //   modules: [
  //     path.resolve(__dirname, './node_modules')
  //   ],
  //   // 后缀尝试列表 尽量带上后缀
  //   extensions: ['.js', '.json', '.jsx', '.ts']
  // },
  // externals: {
  //   //jquery通过script引⼊之后，全局中即有了 jQuery 变量
  //   jquery: 'jQuery'
  // },
  // 优化
  optimization: {
    usedExports: true, // 哪些导出的模块被使⽤了，再做打包
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '-',
      // cacheGroups: {
      //   lodash: {
      //     test: /lodash/,
      //     name: 'lodash'
      //   },
      //   react: {
      //     test: /react|react-dom/,
      //     name: 'react'
      //   }
      // }
    },
    concatenateModules: true
  }
}


// module.exports = smp.wrap(config)
module.exports = config;
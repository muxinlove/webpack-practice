/**
 * webpack prod config
 */
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, './build'),
    // filename: '[name]-[hash:6].js'
    filename: '[name].js',
    // 静态资源路径
    publicPath: 'https://cdn.kaikeba.com/assets/'
  },
  module: {
    // loader 是一个消耗性能的大户
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },

      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src"),
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css'
    }),
    new HtmlWebpackPlugin({
      title: 'my app',
      filename: 'index.html',
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
      }
    }),
    new OptimizeCSSAssetsPlugin({
      // cssnano 默认的一套压缩配置选项 postcss的依赖项，可以不install，直接用
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    })
  ],
}

module.exports = merge(baseConfig, prodConfig)
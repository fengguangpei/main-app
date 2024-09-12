const { default: merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')

module.exports = merge(base({ mode: 'production' }), {
  mode: 'production',
  output: {
    publicPath: 'https://fenggp.obs.cn-south-1.myhuaweicloud.com/main-app/',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      linkType: 'text/css',
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false,
      __VUE_OPTIONS_API__: false,
      PRODUCTION: true
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    // minimizer: [`...`, new MiniCssExtractPlugin()],
    splitChunks: {
      cacheGroups: {
        element: {
          test: /[\\/]node_modules[\\/](element-plus)[\\/]/,
          name: 'element',
          chunks: 'all',
        },
        qiankun: {
          test: /[\\/]node_modules[\\/](qiankun)[\\/]/,
          name: 'qiankun',
          chunks: 'all',
        }
      }
    }
  }
})

const { default: merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { DefinePlugin } = require('webpack')
const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = merge(base({ mode: 'production' }), {
  mode: 'production',
  devtool: 'source-map',
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
    sentryWebpackPlugin({
      org: 'fengguangpei',
      project: 'oa-main-app',
      authToken: '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',
      telemetry: false,
      sourcemaps: {
        filesToDeleteAfterUpload: 'dist/**.js.map'
      },
      release: {
        create: true,
        setCommits: {
          auto: true,
        },
      },
    })
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

const { default: merge } = require('webpack-merge')
const base = require('./webpack.config.base')
const { DefinePlugin } = require('webpack')
module.exports = merge(base({ mode: 'development' }), {
  mode: 'development',
  devServer: {
    port: 8080,
    hot: true,
    open: false,
    historyApiFallback: true,
    static: 'dist',
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3001',
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ],
  },
  plugins: [
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: true,
      __VUE_OPTIONS_API__: false,
      PRODUCTION: false
    }),
  ]
})

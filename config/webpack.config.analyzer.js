const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { default: merge } = require('webpack-merge')
const prod = require('./webpack.config.prod')
module.exports = merge(prod, {
  plugins: [new BundleAnalyzerPlugin()]
})
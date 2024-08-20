const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('node:path')
const { VueLoaderPlugin } = require('vue-loader')
const { ModuleFederationPlugin } = require('webpack').container;
// 按需导入
const { default: Components } = require('unplugin-vue-components/webpack')
const { default: AutoImport } = require('unplugin-auto-import/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { default: Icons } = require('unplugin-icons/webpack')
const { default: IconsResolver } = require('unplugin-icons/resolver')
const { VxeResolver } = require('@vxecli/import-unplugin-vue-components')
module.exports = {
  entry: path.resolve(__dirname, '../src/main.js'),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src/'),
    },
    extensions: ['.js', '.ts', '.vue', '.scss', '.css', '.d.ts']
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'vue-demi': 'VueDemi',
    pinia: 'Pinia',
    'xe-utils': 'XEUtils',
    'vxe-table': 'VXETable'
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        loader: 'vue-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash:8].[ext]'
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash:8].[ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html'),
      urls: [
        'https://unpkg.com/vue@3.2.45/dist/vue.global.js',
        'https://unpkg.com/vue-router@4.1.6/dist/vue-router.global.js',
        'https://cdnjs.cloudflare.com/ajax/libs/vue-demi/0.13.11/index.iife.js',
        'https://cdnjs.cloudflare.com/ajax/libs/pinia/2.0.32/pinia.iife.js',
        'https://cdn.jsdelivr.net/npm/xe-utils@3.5.7/dist/xe-utils.umd.min.js',
        'https://cdn.jsdelivr.net/npm/vxe-table@4.6.17/lib/index.umd.min.js'
      ]
    }),
    new VueLoaderPlugin(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true
        }),
        IconsResolver({
          enabledCollections: ['ep']
        }),
        VxeResolver({
          libraryName: 'vxe-table',
          importStyle: true
        })
      ]
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon',
        }),
      ]
    }),
    Icons({
      autoInstall: true
    }),
    new ModuleFederationPlugin({
      name: 'federation_provider',
      filename: 'remoteEntry.js',
      remotes: {},
    })
  ],
}

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
// const { VxeResolver } = require('@vxecli/import-unplugin-vue-components')
module.exports = (env, argv) => ({
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
    'vxe-table': 'VXETable',
    'qiankun': 'qiankun'
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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
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
        env.mode === 'production'
          ? 'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/vue.js'
          : 'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/vue.global.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/vue-router.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/vue-demi.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/pinia.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/xe-utils.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/vxe-table.js',
        'https://fenggp.obs.cn-south-1.myhuaweicloud.com/externals/qiankun.js'
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
        // VxeResolver({
        //   libraryName: 'vxe-table',
        //   importStyle: true
        // })
      ]
    }),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle: true
        }),
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
})

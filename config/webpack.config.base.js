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
      exposes: {
        './index': './src/index'
      },
      remotes: {},
      shared: {
        "vue": {
          eager: true
        },
        "vue-router": {
          eager: true
        },
        "pinia": {
          eager: true
        },
        "element-plus": {
          eager: true
        }
      }
    })
    // new ModuleFederationPlugin({
    //   name: 'federation_provider',
    //   filename: 'remoteEntry.js',
    //   exposes: {
    //     './Tabs': './src/views/Tabs'
    //   },
    //   remotes: {}
    // }),
  ],
}

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var merge = require('webpack-merge');

module.exports = function(env, argv) {
  const mode = argv.mode || 'production';
  const assetExt = mode == 'production' ? '.min.js' : '.js';
  const assetExtDev = mode == 'production' ? '.min.js' : '.dev.js';
  const assetExtReact =
    mode == 'production' ? '.production.min.js' : '.development.js';
  const base = {
    mode,
    output: {
      libraryTarget: 'system',
      publicPath: '/'
    },
    externals: ['single-spa', 'react', 'react-dom'],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: 'babel-loader' }]
        },
        { parser: { system: false } }
      ]
    },
    devServer: {
      port: 9000,
      open: false
    }
  };
  const config = {
    entry: './root/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'root.bundle.js'
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'single-spa',
        inject: false,
        template: './root/index.ejs'
      }),
      new CopyPlugin([
        {
          from: 'node_modules/systemjs/dist/system' + assetExt,
          to: 'system.js'
        },
        {
          from: 'node_modules/systemjs/dist/extras/named-exports' + assetExt,
          to: 'named-exports.js'
        },
        {
          from: 'node_modules/systemjs/dist/extras/amd' + assetExt,
          to: 'amd.js'
        },
        {
          from: 'node_modules/systemjs/dist/extras/use-default' + assetExt,
          to: 'use-default.js'
        },
        {
          from: 'node_modules/single-spa/lib/system/single-spa' + assetExtDev,
          to: 'single-spa.js'
        },
        {
          from:
            'node_modules/single-spa/lib/system/single-spa' +
            assetExtDev +
            '.map',
          to: 'single-spa.js.map'
        },
        {
          from: 'node_modules/react/umd/react' + assetExtReact,
          to: 'react.js'
        },
        {
          from: 'node_modules/react-dom/umd/react-dom' + assetExtReact,
          to: 'react-dom.js'
        },
        {
          from: 'node_modules/react-router-dom/umd/react-router-dom' + assetExt,
          to: 'react-router-dom.js'
        },
        {
          from:
            'node_modules/react-router-dom/umd/react-router-dom' +
            assetExt +
            '.map',
          to: 'react-router-dom.js.map'
        }
      ])
    ]
  };
  return [
    merge(base, config),
    merge(base, {
      entry: './app1/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app1.bundle.js'
      }
    }),
    merge(base, {
      entry: './app2/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app2.bundle.js'
      }
    }),
    merge(base, {
      entry: './app3/index.js',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app3.bundle.js'
      }
    })
  ];
};

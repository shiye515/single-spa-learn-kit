const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var merge = require("webpack-merge");

module.exports = function(env, argv) {
  const mode = argv.mode || "production";
  const base = {
    mode,
    output: {
      libraryTarget: "system",
      publicPath: "/"
    },
    externals: ["single-spa", "react", "react-dom"],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [{ loader: "babel-loader" }]
        },
        { parser: { system: false } }
      ]
    },
    devServer: {
      port: 9000,
      open: true
    }
  };
  const config = {
    entry: "./root/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "root.bundle.js"
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "single-spa",
        inject: false,
        template: "./root/index.ejs"
      }),
      new CopyPlugin([
        {
          from: "node_modules/systemjs/dist",
          to: "systemjs/"
        },
        {
          from: "node_modules/single-spa/lib/system",
          to: "single-spa/"
        },
        {
          from: "node_modules/react/umd",
          to: "react/"
        },
        {
          from: "node_modules/react-dom/umd",
          to: "react-dom/"
        },
      ])
    ]
  };
  return [
    merge(base, config),
    merge(base, {
      entry: "./app1/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app1.bundle.js"
      }
    }),
    merge(base, {
      entry: "./app1/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app1.bundle.js"
      }
    }),
    merge(base, {
      entry: "./app2/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app2.bundle.js"
      }
    }),
    merge(base, {
      entry: "./app3/index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app3.bundle.js"
      }
    })
  ];
};

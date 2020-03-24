const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
module.exports = function(env, argv) {
  const config = {
    mode: argv.mode || "production",
    entry: "./root/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      library: "main",
      libraryTarget: "system",
      filename: "root.bundle.js"
      // publicPath: "https://cdn.example.com/assets/"
    },
    module: {
      rules: [{ parser: { system: false } }]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "title111",
        bootstrap: "<script>System.import('name-of-module')</script>",
        // inject: false,
        template: "./root/index.ejs"
      }),
      new HtmlWebpackTagsPlugin({
        tags: ["system.min.js"],
        append: false
      }),
      new CopyPlugin([
        {
          from: "node_modules/systemjs/dist/system.min.js",
          to: "system.min.js"
        }
      ])
    ],
    devServer: {
      port: 9000,
      open: true
    }
  };
  return [config];
};

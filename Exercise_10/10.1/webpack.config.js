let HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const src = path.join(__dirname, "src");
const dist = path.join(__dirname, "dist");

module.exports = {
  context: src,
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  entry: ["babel-polyfill", "main.js"],
  output: {
    path: dist,
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js"],
    modules: [src, "node_modules"],
  },
  mode: "development",
  devServer: {
    compress: true,
    port: 9000,
    static: src,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.resolve(__dirname, "src")],
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

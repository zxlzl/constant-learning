const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 单入口
  entry: "./src/index.js",
  // entry: ["./src/a.js","./src/b.js"],
  // 多入口
  // entry: {
  //   a: "./src/a.js",
  //     b: "./src/b.js",
  // },
  
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      // loader
      {
        test: /\.css$/,
        use: "css-loader"
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()], // 插件配置
};

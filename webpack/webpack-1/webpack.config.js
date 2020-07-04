const path = require("path");

module.exports = {
  // 入口
  entry: "./src/index.js",
  output: "./dist",
  mode: "production",
  module: {
    rules: [
      // loader 
      {
        test: /\.css$/,
        use: "style-loader"
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin()] // 插件配置
}

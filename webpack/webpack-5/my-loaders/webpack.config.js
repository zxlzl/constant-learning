const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  resolveLoader:{
    modules: ["./node_modules","./myLoaders"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "replaceLoader",
            options: {
              name: "zxl hello nihao",
            },
          },
          {
            loader: "replaceAsyncLoader",
            options: {
              name: "lzl",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use:['style-loader',"css-loader",'less-loader']
      }
    ],
  },
  plugins: [new htmlWebpackPlugin()],
};

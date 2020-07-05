const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
// 开起js的hmr需要webpack
const webpack = require('webpack')

// mpa 多页面打包方案
// entry
// htmlWebpackPlugin

const setMpa = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));
  // [
  //   '/Users/zhaoxiaoli/Learn/constant-learning/webpack/webpack-2/src/detail/index.js',
  //   '/Users/zhaoxiaoli/Learn/constant-learning/webpack/webpack-2/src/home/index.js',
  //   '/Users/zhaoxiaoli/Learn/constant-learning/webpack/webpack-2/src/list/index.js'
  // ]

  entryFiles.map((item, index) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: path.join(__dirname, `./src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });

  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMpa();

module.exports = {
  entry: "./src/index.js",
  // entry: {main:"./src/index.js",list: "./src/list.js",detail: "./src/detail.js"},
  // entry,
  output: {
    filename: "[name]_[hash:6].js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
      },
      {
        test: /\.(png|gif|jpe?g|webp)$/,
        use: {
          // loader: 'file-loader',
          loader: "url-loader",
          options: {
            name: "[name]_[hash:6].[ext]",
            outputPath: "images/",
            limit: 10240, // 专为base64格式 放入bundle.js
          },
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash:6].[ext]",
            outputPath: "iconfont/",
            limit: 1024, // 专为base64格式 放入bundle.js
          },
        },
      },
    ],
  },
  devtool: "inline-source-map",
  plugins: [
    new htmlWebpackPlugin({
      title: "index",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
    }),
    // new htmlWebpackPlugin({
    //   title: "detail",
    //   filename: "detail.html",
    //   template: "./src/index.html",
    //   chunks: ['detail','list']
    // }),
    // new htmlWebpackPlugin({
    //   title: "list",
    //   filename: "list.html",
    //   template: "./src/index.html",
    //   chunks: ['list']
    // }),
    // ...htmlWebpackPlugins,

    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  // devServer: {
  //   contentBase: "./dist",
  //   open: true,
  //   port: 8081,
  //   hot: true,// 开起hmr 制定hot的模块是通过websocket推送到网页
  //   hotOnly: true, //关闭浏览器自动刷新 
  //   proxy: {
  //     "/api":{
  //       target: "http://localhost:9092"
  //     }
  //   }
  // },
};

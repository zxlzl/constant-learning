const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");
// 开起js的hmr需要webpack
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// mpa 多页面打包方案
// entry
// htmlWebpackPlugin

// 1、hash作用于js css 图片的hash有区别
// 2、hash打包一次 变化一次 不利于缓存

// js chunkhash
// css contenthash
// image hash

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
  // entry: "./src/index.js",
  entry: {
    main: "./src/home/index.js",
    list: "./src/list/index.js",
    detail: "./src/detail/index.js",
  },
  // entry,
  output: {
    filename: "[name]_[chunkhash:6].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "http://www.test.com",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "./src"),
        // include: [
        //   path.resolve(__dirname, 'app/styles'),
        //   path.resolve(__dirname, 'vendor/styles') ],
        // exclude: "",

        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, "./src"),

        exclude: path.resolve(__dirname, "./node_modules"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },

          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|gif|jpe?g|webp|svg)$/,
        include: path.resolve(__dirname, "./src"),

        use: [
          {
            // loader: 'file-loader',
            loader: "url-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              outputPath: "images/",
              limit: 10240, // 专为base64格式 放入bundle.js
            },
          },
          {loader: 'image-webpack-loader'}
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: path.resolve(__dirname, "./src"),

        use: {
          loader: "url-loader",
          options: {
            name: "[name]_[hash:6].[ext]",
            outputPath: "iconfont/",
            limit: 1024, // 专为base64格式 放入bundle.js
          },
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    // 定义第三方依赖的位置
    modules: [path.resolve(__dirname, "./node_modules")],
    alias: {
      // 给图片起别名 注意html css使用 不要忘记~
      "@assets": path.resolve(__dirname, "./src/images/"),
    },
    extensions: [".js", ".json", ".jsx", ".ts"],
  },
  devtool: "inline-source-map",
  plugins: [
    new htmlWebpackPlugin({
      title: "index",
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
      // html压缩
      minify: {
        removeComments: true, //移除注释
        collapseWhitespace: true,
        minifyCSS: true, //压缩内联css
      },
    }),
    new htmlWebpackPlugin({
      title: "detail",
      filename: "detail.html",
      template: "./src/index.html",
      chunks: ["detail"],
    }),
    new htmlWebpackPlugin({
      title: "list",
      filename: "list.html",
      template: "./src/index.html",
      chunks: ["list"],
    }),
    // ...htmlWebpackPlugins,

    // new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      // 容易造成对应层级问题
      filename: "css/[name]_[contenthash:6].css",
    }),
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
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

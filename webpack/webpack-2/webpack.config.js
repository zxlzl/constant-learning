const path = require('path')
// const 

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname,'dist')
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',"css-loader"]
      },
      {
        test: /\.less$/,
        use: ['style-loader',"css-loader","postcss-loader","less-loader"]
      }
    ]
  },
  plugins: []
}
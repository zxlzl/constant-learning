module.exports = {
  // 处理css 成ast抽象语法树 把抽象的语法树转换为相应的css
  // 插件机制 postcss
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist:["last 2 versions",">1%"]
    })
  ]
}
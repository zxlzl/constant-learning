// less 转换 css语法
const less = require("less")

module.exports = function(source){
  less.render(source,(e,output)=>{
    this.callback(e,output.css)
  })
}
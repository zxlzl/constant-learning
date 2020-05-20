const fs = require('fs')
const path = require('path')

module.exports = (dirPath = './public')=>{
  return async(ctx, next)=>{
    if (ctx.url.indexOf('/public')===0) {
      // public开头， 读取文件
      const url = path.resolve(__dirname,dirPath);
      // ctx.url /public/index
      // filepath /Users/zhaoxiaoli/learn/constant-learning/node/02/source/public/index
      const filepath = url+ctx.url.replace('/public','')
      try {
        stats = fs.statSync(filepath)
        if (stats.isDirectory()) {
          const dir = fs.readdirSync(filepath)
          const ret = ['<div style="padding-left:20px">']
          dir.forEach(filename=>{
            console.log(filename);
            if (filename.indexOf(".")>-1) {
              ret.push(`<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`)
            } else{
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
              )
            }
          })
          ret.push("</div>")
          ctx.body=ret.join("")
        } else {
          const content = fs.readFileSync(filepath)
          ctx.body = content
        }
      } catch (error) {
        ctx.body = "404 not found"
      }
      
    } else {
      await next()
    }
  }
}
const { compilation } = require("webpack");

class CopyrightWebpackPlugin {
  constructor(options){
    console.log(options);
  }

  apply(compiler){
    // hook.emit 定义在某个时刻
    compiler.hooks.emit.tapAsync(
      'CopyrightWebpackPlugin',
      (compilation,cb)=>{
        compilation.assets['copyright.txt'] = {
          source: function(){
            return "这是赵小莉的版权"
          },
          size: function() {
            return 20
          }
        };
        cb()
      }
    )

    // 同步写法
    // compiler.hooks.compile.tap("CopyrightWebpackPlugin",compilation=>{
    //   console.log(11212121212121325647);
    // })
  }
}

module.exports = CopyrightWebpackPlugin
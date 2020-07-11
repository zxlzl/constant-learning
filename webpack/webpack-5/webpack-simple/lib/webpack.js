const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const path = require('path')
const { transformFromAst } = require("@babel/core");
module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = []
  }
  run() {
    // 启动函数
    const info = this.parse(this.entry);
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const {yilai} = item
      if (yilai) {
        for (const j in yilai) {
          this.modules.push(this.parse(yilai[j]))
        }
      }
    }

    // 数组结构转换
    const obj = {}
    this.modules.forEach(item=>{
      obj[item.entryFile] = {
        yilai:item.yilai,
        code:item.code
      }
    })
    this.file(obj)
  }
  parse(entryFile) {
    // console.log(entryFile);
    const content = fs.readFileSync(entryFile, "utf-8");
    // 分析内容 得到ast
    const ast = parser.parse(content, {
      sourceType: "module",
    });
    // console.log(ast.program.body);
    const yilai = {}
    traverse(ast,{
      ImportDeclaration({node}){
        // 拿到一个一个节点 node
        // 拿到模块依赖在项目中的路径
        // ./src/
        //path.dirname(entryFile)
        const nodeSource = node.source.value  //./a.js
        const newPath = "./"+path.join(path.dirname(entryFile),nodeSource)
        yilai[nodeSource] = newPath
      }
    })
    // console.log(yilai);

    // babel/preset-env做的事
    // 1、加工厂
    // 2、原材料ast
    // 3、加工成es5

    // 处理内容 转换代码
    const {code}=transformFromAst(ast,null,{
      // 处理成标准代码
      presets:["@babel/preset-env"]
    })
    return {
      entryFile,yilai,code
    }
  }
  file(code) {
    // this.output.path this.output.filename
    const filepath = path.join(this.output.path,this.output.filename)
    const newCode = JSON.stringify(code)
    console.log(code);
    const bundle = `(function(graph){
      function require(module){
        function localRequire(relativePath){
          return require(graph[module].yilai[relativePath])
          // module['a.js]
        }
        var exports= {};
        (function(require,exports,code){
          eval(code)
        })(localRequire,exports,graph[module].code)
        return exports
      }   
      require('${this.entry}') 
    })(${newCode})`
    fs.writeFileSync(filepath,bundle,'utf-8')
  }
};

const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default
const path = require('path')

module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
  }
  run() {
    // 启动函数
    this.parse(this.entry);
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
        // 拿到模块依赖在项目中的路径
        // ./src/
        //path.dirname(entryFile)
        const nodeSource = node.source.value  //./a.js
        const newPath = "./"+path.join(path.dirname(entryFile),nodeSource)
        yilai[nodeSource] = newPath
      }
    })
    console.log(yilai);

    // 处理内容 转换代码
    
  }
  file() {}
};

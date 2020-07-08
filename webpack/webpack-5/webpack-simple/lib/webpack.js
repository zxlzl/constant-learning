const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse")

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
    console.log(ast.program.body);
    traverse(ast,{
      ImportDeclaration({node}){
        console.log(node);
      }
    })
  }
  file() {}
};

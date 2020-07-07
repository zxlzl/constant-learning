const fs = require("fs")

module.exports = class Webpack {
  constructor(options) {
    console.log(options);
    const {entry, output} = options
    this.entry = entry
    this.output = output
  }
  run() {
      // 启动函数
    this.parse(this.entry)
  }
  parse(entryFile) {
    // console.log(entryFile);
    const content = fs.readFileSync(entryFile, 'utf-8')
    console.log(content);
  }
  file(){

  }
};

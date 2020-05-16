const path = require("path");
const testAll = class TestNow {
  constructor(){
    this.fs = require('fs')
  }

  /**
   * 生成测试文件
   * @param {*} filename 
   */
  genTestFile(filename) {
    console.log("genTestFile:" + filename);
    const testFileName = this.getTestFileName(filename)

    if(this.fs.existsSync(testFileName)){
      console.log('该测试代码已经存在');
      return
    }
    const module = require(filename)
    let source
    if(typeof module === 'object'){
      source = Object.keys(module).map(v=>this.getTestSourceCode(v,path.basename(filename),true)).join('\n')
    }else if (typeof module == 'function') {
      const basename = path.basename(filename)
      source = this.getTestSourceCode(basename.replace('.js',''),basename)
    }
    this.fs.writeFileSync(testFileName,source)
  }

  /**
   * 生成jest测试代码
   * @param {*} sourcePath 
   */
  genJestSource(sourcePath=path.resolve('./')){
    // /Users/zhaoxiaoli/Learn/constant-learning/node-pre/testAll/__test__/data/__test__/
    const testPath = `${sourcePath}/__test__/`
    const a = !this.fs.existsSync(testPath)
    if (!this.fs.existsSync(testPath)) {
      this.fs.mkdirSync(testPath)
    }

    // 遍历代码文件
    let list = this.fs.readdirSync(sourcePath)
    list
    // 添加完整路径
      .map(v=>`${sourcePath}/${v}`)
      .filter(v=>this.fs.statSync(v).isFile())
      .filter(v=>v.indexOf('.spec')===-1)
      .map(v=>this.genTestFile(v))
  }

  /**
   *
   * @param {*} methodName
   * @param {*} classFile
   * @param {*} isClass
   */
  getTestSourceCode(methodName, classFile, isClass = false) {
    console.log("getTestSource: ", methodName);
    return `
test('${"TEST " + methodName}',() => {
const ${isClass ? "{" + methodName + "}" : methodName} = require('${
      "../" + classFile
    }')
const ret = ${methodName}()
// expect(ret)
//     .toBe('test ret')
})`;
  }

  /**
   * 生成测试文件名
   * @param {*} filename
   */
  getTestFileName(filename) {
    // '/abc/class.js'
    const dirName = path.dirname(filename); // /abc
    const baseName = path.basename(filename); // class.js
    const extname = path.extname(filename); // .js
    const testName = baseName.replace(extname, `.spec${extname}`); // .js->.spec.js

    return path.format({
      root: dirName + "/__test__/",
      base: testName,
    });
  }
};


// const test = new testAll()
// test.genJestSource(__dirname+'/__test__/data')


module.exports = testAll
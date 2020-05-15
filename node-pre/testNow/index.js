const path = require('path')
module.exports = class TestNow {
  /**
   * 生成测试文件名
   * @param {*} filename
   */
  getTestFileName(filename) {
    // '/abc/class.js'
    const dirName = path.dirname(filename) // /abc
    const baseName = path.basename(filename) // class.js
    const extname = path.extname(filename) // .js
    const testName = baseName.replace(extname,`.spec${extname}`) // .js->.spec.js

    return path.format({
      root: dirName+'/__test__/',
      base: testName
    })
  }
}








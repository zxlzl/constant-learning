// test('测试文件名称',() => {
//   const src = new (require('../index'))()
//   const ret = src.getTestFileName('/abc/class.js')
//   console.log('getSourceName',ret)
//   expect(ret)
//   .toBe('/abc/__test__/class.spec.js')
// })

test('生成测试代码', () => {
  const src = new (require('../index'))()
  const ret = src.getTestSourceCode('fun','class')
  expect(ret)
      .toBe(
          `
test('TEST fun',() => {
  const fun = require('../class')
  const ret = fun()
  // expect(ret)
  //     .toBe('test ret')
})
      `
      )
})
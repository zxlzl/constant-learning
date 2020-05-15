// test('测试helloworld',()=>{
//   const ret = require('../index')
//   expect(ret)
//     .toBe('Hello world')
// })

it('测试Export', () => {
  const string = require('../index')
  console.log('export', string)
})
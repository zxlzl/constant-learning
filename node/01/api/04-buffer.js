const buf1 = Buffer.alloc(10)
// console.log(buf1);

// 创建Buffer 包含ascii 
// 查询 http://ascii.911cha.com/
const buf2= Buffer.from('a')
// console.log(buf2,buf2.toString());

// 包含utf8
// const buf3 = Buffer.from('buffer创建方法')
// console.log(buf3);
// console.log(buf3.toString());

// 写入buffer数据
buf1.write('hello')
// 读取buffer数据
// console.log(buf1.toString());

// 合并buffer
const buf4 = Buffer.concat([buf1,buf2])
console.log(buf4.toString());






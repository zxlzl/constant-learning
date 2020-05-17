const fs = require("fs");

// 同步
const data = fs.readFileSync('./01-run.js')
console.log(data);

// 异步
// fs.readFile('./01-run.js',(err,data)=>{
//     if (err) {
//         throw err
//     }
//     console.log(data.toString());
// })

// promisify
// const { promisify } = require("util");
// const readFile = promisify(fs.readFile);
// readFile("./01-run.js").then((data) => console.log(data));

// fs Promise api
// const fsp = require("fs").promises;
// fsp
//   .readFile("./01-run.js")
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

// async/await
(async ()=>{
    const fs = require('fs')
    const {promisify} = require('util')
    const readFile = promisify(fs.readFile)
    const data = await readFile('./01-run.js')
    console.log(data);
})()

// 引用方式
const dat1a = Buffer.from(data).toString()
console.log(dat1a);


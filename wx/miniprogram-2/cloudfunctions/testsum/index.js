// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
console.log("asdasd")

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  const {a,b} = event
  console.log(event)

  return {
    sum: a+b
  }
}
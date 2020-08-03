// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const doubanbook = require('doubanbook')

cloud.init()

async function getBookData(isbn) {
  // https://search.douban.com/book/subject_search?search_text=9787121263606&cat=1001
  const url = "https://search.douban.com/book/subject_search?search_text=" + isbn
  let res = await axios.get(url)

  let reg = /window\.__DATA__ = "(.*)"/;
  if (reg.test(res.data)) {
    let bookData = RegExp.$1

    let realData = doubanbook(bookData)
    console.log(realData)
    return realData[0]
  }
}

// getBookData("9787121263606")

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()

  const {
    isbn
  } = event
  const res = await getBookData(isbn)

  const db = cloud.database()
  
  db.collection("books").add({
    data:{
      title: res.result.res.title,
      cover_url: res.result.res.cover_url
    }
  })
  return {
    res
  }
}
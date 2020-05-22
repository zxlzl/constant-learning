const http = require('http')
const fs = require('fs')

const app = http.createServer((req,res)=>{
  const {method, url} = req
  if(method == 'GET' && url == "/"){
    fs.readFile("./index.html",(err,data)=>{
      res.setHeader("Content-Type","text/html")
      res.end(data)
    })
  } else if(method === "GET" && url === "/api/download"){
    fs.readFile("./file.pdf",(err, data)=>{
      res.setHeader("Content-Type","application/pdf")
      const fileName = encodeURI("xxx")
      res.setHeader("Content-Disposition",`attachment;filename="${fileName}.pdf"`)
      res.end(data)
    })
  }
})

app.listen(3000)
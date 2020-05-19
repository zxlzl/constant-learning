const Koa = require('./koa')
const app = new Koa()

app.use((req,res)=>{
  res.writeHead(200)
  res.end('hi zxl')
})

app.listen(3000)
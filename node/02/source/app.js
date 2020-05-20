const Koa = require("./koa");
const app = new Koa();

// app.use((req,res)=>{
//   res.writeHead(200)
//   res.end('hi zxl')
// })

// const delay = () =>
//   Promise.resolve((resolve) => setTimeout(() => resolve(), 2000));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   setTimeout(() => {
//     ctx.body += "2";
//   }, 2000);
//   await next();
//   ctx.body += "3";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "4";
//   await delay();
//   await next();
//   ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "6";
// });

// const static = require('koa-static')
// const static = require('./static')
// app.use(static(__dirname+'/public'))

// const Router = require('koa-router')
const Router = require('./router')
const router = new Router()


router.get('/index',async ctx => {
  ctx.body = 'index page'
})
router.get('/post',async ctx=>{
  ctx.body = 'post page'
})
router.get('/list',async ctx=>{
  ctx.body = 'list page'
})
router.get('/index',async ctx=>{
  ctx.body = 'post page'
})

router.routes()
app.use(router.routes())

app.listen(3000);

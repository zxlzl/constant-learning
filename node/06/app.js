const koa = require("koa")
const app = new koa()
const session = require("koa-session")

const redisStore = require("koa-redis")
const redis = require('redis')
const redisClient = redis.createClient(6739, 'localhost')

const wrapper = require("co-redis")
const client = wrapper(redisClient)

app.keys = ['some secret']

const SESS_CONFIG = {
  key: 'kkb:sess',
  // maxAge: 864000,
  // httpOnly: true,
  // signed: true,
  store: redisStore({client})
}

app.use(session(SESS_CONFIG,app))

app.use(ctx=>{
  redisClient.key('*',(err,keys)=>{
    console.log('keys:'+keys);
    keys.forEach(key => {
      redisClient.get(key, (err, val)=>{
        console.log(val)
      })
    });
  })

  if (ctx.path === '/favicon.ico') {
    return
  }
  let n = ctx.session.count ||0
  ctx.session.count = ++n
  ctx.body = '第'+n+'次访问'
})

app.listen(3000)

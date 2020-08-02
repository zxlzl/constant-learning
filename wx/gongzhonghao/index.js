const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const bodyParser = require("koa-bodyparser");
const axios = require("axios")
const app = new Koa();
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname + "/"));

const conf = require("./conf");

const wechat = require("co-wechat");

router.all(
  "/wechat",
  wechat(conf).middleware(async message => {
    console.log("wechat", message);
    return "大妞妞是我最爱的猪宝宝!" + message.Content;
  })
);

const tokenCache = {
  access_token: '',
  updateTime: Date.now(),
  expires_in: 7200
}

// router.get('/getToken',async ctx=>{
//   const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${conf.appid}&secret=${conf.appsecret}`
//   const res = await axios.get(url)
//   Object.assign(tokenCache,res.data,{
//     updateTime: Date.now()
//   })
//   ctx.body = res.data
// })

// router.get('/getFollowers',async ctx=>{
//   const url = `https://api.weixin.qq.com/cgi-bin/user/get?access_token=${tokenCache.access_token}`
//   const res = await axios.get(url)
//   console.log('getFollowers',res.data);
//   ctx.body = res.data
// })

const WechatAPI = require('co-wechat-api')
const api = new WechatAPI(conf.appid,conf.appsecret)

router.get('/getFollowers',async ctx=>{
  let res = await api.getFollowers()
  res = await api.batchGetUsers(res.data.openid,'zh-CN')
  ctx.body = res
})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(3000);

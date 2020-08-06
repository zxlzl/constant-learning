const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const xml2js = require("xml2js");
const app = new Koa();
const url = require("url");
const conf = require("./conf");

const crypto = require('crypto')
const xmlParser = require('koa-xml-body')
app.use(xmlParser());

const router = new Router();
app.use(static(__dirname + "/"));

console.log(11111111111);
let {query} = url.parse('http://zxl.free.idcfengye.com/wechat?signature=52ad9e6ee98d68054ab6fc13a4953b742e2895f9&echostr=5439232342866983353&timestamp=1596330377&nonce=1399452441',true)
console.log(query);
const { signature, timestamp, nonce, echostr } = query;
console.log(signature);
console.log(111111111);
// 验证
router.get("/wechat", (ctx) => {
  console.log("微信认证...", ctx.url);
  const { query } = url.parse(ctx.url, true);
  const { signature, timestamp, nonce, echostr } = query;
  console.log("wechat", query);

  // 将token timestamp nonce 三个参数进行字典序排序并用sha1加密

  let str = [conf.token, timestamp, nonce].sort().join("");
  console.log("str", str);
  let strSha1 = crypto.createHash("sha1").update(str).digest("hex");

  console.log(`自己加密后的字符串为：${strSha1}`);
  console.log(`微信传入的加密字符串为：${signature}`);
  console.log(`两者比较结果为：${signature == strSha1}`);

  // 签名对比
  if (signature == strSha1) {
    ctx.body = echostr;
  } else {
    ctx.body = "你不是微信";
  }
});

// 接受信息
router.post("/wechat", (ctx) => {
  const { xml: msg } = ctx.request.body;
  console.log("receive:", msg);
  const builder = new xml2js.Builder();
  const result = builder.buildObject({
    xml: {
      ToUserName: msg.FromUserName,
      FromUserName: msg.ToUserName,
      CreateTime: Date.now(),
      MsgType: msg.MsgType,
      Content: "Hello " + msg.Content,
    },
  });
  ctx.body = result;
});

app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3000);

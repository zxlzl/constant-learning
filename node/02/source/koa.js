const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class Koa {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      // this.callback(req, res);
      this.callback(ctx)
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  // 传入的callback
  // (req,res)=>{
  //   res.writeHead(200)
  //   res.end('hi zxl')
  // }
  

  // use(middleware){
  //   this.middlewares.push(middleware)
  // }
  use(callback) {
    this.callback = callback;
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
}

module.exports = Koa;

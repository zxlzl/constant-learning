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
      const fn = this.compose(this.middlewares)
      // this.callback(req, res);
      // this.callback(ctx)
      await fn(ctx)
      res.end(ctx.body);
    });
    server.listen(...args);
  }
  // 传入的callback
  // (req,res)=>{
  //   res.writeHead(200)
  //   res.end('hi zxl')
  // }
  

  use(middleware){
    this.middlewares.push(middleware)
  }
  // use(callback) {
  //   this.callback = callback;
  // }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }

  // fn1 fn2 fn3 fn4
  compose(middlewares) {
    return function(ctx){
      return dispatch(0)
      function dispatch(i){
        let fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next(){
            return dispatch(i+1)
          })
        )
      }
    }
  }
}

module.exports = Koa;

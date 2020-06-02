const koa = require("koa")
const {initRouter, initController, initService, loadConfig, initSchedule}  = require("./zgg-loader")

class zgg {
  constructor(conf){
    this.$app = new koa(conf)
    loadConfig(this)
    this.$service = initService(this)
    this.$ctrl = initController(this)

    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())

    initSchedule()
  }

  start(port) {
    this.$app.listen(port, ()=>{
      console.log('服务器启动，端口号为：'+port);
      
    })
  }
}

module.exports = zgg
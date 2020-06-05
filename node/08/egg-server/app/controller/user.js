const Controller = require("egg").Controller

// 用户管理
class UserController extends Controller {
  constructor(ctx){
    super(ctx)
  }

  async create() {
    const {ctx}= this
    ctx.body = 'user ctrl'
  }

}

module.exports = UserController

'use strict';

import * as Koa from 'koa'
import {get, post,querystring} from '../utils/decors'

const users = [{name: 'Tom', age: 18}]

const api = {
  findByName(name){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        if (name === 'zxl') {
          reject('用户已存在')
        }else {
          resolve()
        }
      }, 500);
    })
  }
}

export default class User{
  @get('/users')
  @querystring({
    age: {type: 'int', required: false, max: 200,convertType: 'int'}
  })

  public async list(ctx:Koa.Context){
    ctx.body = {ok:1,data:users}
  }

  @post('/users', {
    middlewares: [
      async function validation(ctx:Koa.Context,next:()=>Promise<any>){
        const name = ctx.request.body.name
        if (!name) {
          throw '请输入姓名'
        }

        try {
          await api.findByName(name)
          await next()
        } catch (error) {
          throw error
        }
      }
    ]
  })
  public add(ctx:Koa.Context){
    users.push(ctx.request.body)
    ctx.body = {ok:1}
  }
}


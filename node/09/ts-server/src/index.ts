import * as Koa from "koa";
import * as bodify from "koa-body";

const app = new Koa();
app.use(
  bodify({
    multipart: true,
    strict: false,
  })
);

app.use((ctx: Koa.Context) => {
  ctx.body = "hello";
});

import { load } from "./utils/decors";
import { resolve } from "path";
import { Sequelize } from "sequelize-typescript";

const database = new Sequelize({
  port: 3306,
  database: "zxl",
  username: "root",
  password: "root123",
  dialect: "mysql",
  modelPaths: [`${__dirname}/model`],
});

const router = load(resolve(__dirname, "./routes"));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
    app.emit("error", err, this);
    // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    const status = err.status || 500;
    // 从 error 对象上读出各个属性，设置到响应中
    ctx.body = {
      code: status,
      error: err,
    };

    if (status === 422) {
      ctx.body.detail = err.errors;
    }
    ctx.status = 200;
  }
});

app.use(router.routes());


// 自定义loader

// loader本质是一个函数 但是不能是箭头函数
// loader处理模块
module.exports = function (source) {
  // 一定要有返回值
  // return source.replace("webpack", this.query.name );
  // this.callback(
  //   null,result,
  // )

  const callback = this.async()

  setTimeout(() => {
  const result = source.replace("webpack", this.query.name );
  // this.async 返回的callback = this.callback
    return callback(null, result)
  }, 1000);
};

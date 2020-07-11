// 自定义loader

// loader本质是一个函数 但是不能是箭头函数
// loader处理模块
module.exports = function (source) {
  console.log(this,this.query);
  // 一定要有返回值
  return source.replace("lzl", "去你妈的webpack" );
};

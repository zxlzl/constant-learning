const express = require("express");

const app = express();

app.route('/api/info')
  .get(function (req, res, next) {
    res.json({
      name: 'zxl',
      age: 15
    })
  })

app.listen(9092,()=>{
  console.log('服务启动！');
});

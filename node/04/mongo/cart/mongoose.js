const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
const conn = mongoose.connection;
conn.on("error",()=>console.error("连接数据库失败"))
(async ()=>{
  const mysql = require("mysql2/promise")

  // 连接配置
  const cfg = {
    host: "localhost",
    user: "root",
    password: "root123",
    database: "zxl"
  }

  const connection = await mysql.createConnection(cfg)

  let ret = await connection.execute(`
  CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
PRIMARY KEY (id))
  `)
  console.log('create', ret)

  ret = await connection.execute(`
  INSERT INTO test(message)
  VALUES(?)
`, ['ABC'])

  console.log('insert', ret);

  ret = await connection.execute(`SELECT * FROM test`)

  console.log(JSON.stringify(ret[0]));

  connection.end()
})()
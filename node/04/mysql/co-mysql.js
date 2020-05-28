(async ()=>{
  const mysql = require("mysql2/promise")

  const cfg = {
    host: "localhost",
    user: "root",
    password: "root123",
    database: "zxl"
  }

  const conn = await mysql.createConnection(cfg)

  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;
const SELECT_SQL = `SELECT * FROM test`;

let ret
// ret = await conn.execute(CREATE_SQL)
// console.log('create', ret);
// ret = await conn.execute(INSERT_SQL,['abc'])
// console.log('insert', ret);
const [rows, fields] = await conn.execute(SELECT_SQL)
console.log('select', rows);
})()
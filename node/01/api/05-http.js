const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log("response的原型链", getPrototypeChian(res));
  // console.log("request的原型链", getPrototypeChian(req));
  // res.end('hello')
  const { url, method, headers } = req;
  if (url === "/" && method === "GET") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "text/plain;charset=utf-8",
        });
        res.end("500,服务器错误");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (url === "/users" && method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end(
      JSON.stringify({
        name: "zxl",
      })
    );
  } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
    // 流 /01.png
    fs.createReadStream("." + url).pipe(res);
  }
});

// 原型链
function getPrototypeChian(obj) {
  const protoChian = [];
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChian.push(obj);
  }
  return protoChian;
}

server.listen(3000);

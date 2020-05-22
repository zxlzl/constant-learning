const http = require("http");
const fs = require("fs");
const path = require("path");
const chunk = [];
let size = 0;
const server = http.createServer((req, res) => {
  const { pathname } = require("url").parse(req.url);
  if (pathname === "/upload") {
    console.log("upload...");
    const filename = req.headers["file-name"]
      ? req.headers["file-name"]
      : "abc.png";
    const outputFile = path.resolve(__dirname, filename);
    const fis = fs.createWriteStream(outputFile);

    req.on('data', data=>{
      chunk.push(data)
      size+=data.length
    })
    req.on('end',()=>{
      const buffer = Buffer.concat(chunk,size)
      size = 0
      fs.writeFileSync(outputFile, buffer)
    })

    req.pipe(fis);
    res.end();
  } else {
    const filename = pathname === "/" ? "index.html" : pathname.substring(1);
    let type = (function (_type) {
      switch (_type) {
        case "html":
        case "htm":
          return "text/html charset=UTF-8";
        case "js":
          return "application/javascript charset=UTF-8";
        case "css":
          return "text/css charset=UTF-8";
        case "txt":
          return "text/plain charset=UTF-8";
        case "manifest":
          return "text/cache-manifest charset=UTF-8";
        default:
          return "application/octet-stream";
      }
    })(filename.substring(filename.lastIndexOf(".") + 1));

    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-type": "text/plain charset=UTF-8" });
        res.write(err.message)
      } else {
        res.writeHead(200, {'Content-Type': type})
        res.write(data)
      }
      res.end()
    });
  }
});

server.listen(3000)

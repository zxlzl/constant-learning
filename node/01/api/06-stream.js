const fs = require('fs')
const rs = fs.createReadStream('./2.png')
const ws = fs.createWriteStream('./gen2.png')
rs.pipe(ws)

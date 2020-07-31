const path = require("path");
const argv = require("minimist")(process.argv.slice(2))
// console.log(process.argv.slice(2));
console.log(process.env.web);
// console.log(argv);
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: { path: path.resolve(__dirname, "./dist") },
};

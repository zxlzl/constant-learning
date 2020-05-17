const { promisify } = require("util");
const figlet = promisify(require("figlet")); // 颜文字
const clear = require("clear"); //清屏
const chalk = require("chalk"); //令行变颜色

const log = (content) => console.log(chalk.green(content));
const { clone } = require("./download");

const spawn = async (...args) => {
  const { spawn } = require("child_process");
  return new Promise((reslove) => {
    const proc = spawn(...args);
    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
    proc.on("close", () => {
      reslove();
    });
  });
};

module.exports = async (name) => {
  // 打印欢迎界面
  clear();
  const data = await figlet("welcome");
  log(data);

  // log(`🚀创建项目：` + name);
  // await clone("github:su37josephxia/vue-template", name)
  // log("安装依赖");
  // await spawn("cnpm", ["install"], { cwd: `./${name}` });
  log(`
  👌安装完成：
  To get Start:
  ===========================
      cd ${name}
      npm run serve
  ===========================
              `);
  const open = require("open");
  open("http://localhost:8080");
  await spawn("npm", ["run", "serve"], { cwd: `./${name}` });
};

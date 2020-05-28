(async () => {
  const Sequelize = require("sequelize");

  // 建立连接
  const sequelize = new Sequelize("zxl", "root", "root123", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false,
  });

  // 定义模型
  const Fruit = sequelize.define("Fruit", {
    name: {
      type: Sequelize.STRING(20),
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
  });
  // 同步数据库，force: true则会删除已存在表
  let ret = await Fruit.sync({ force: true });

  const data = new Array(3).fill().map((v,i)=>{
    return {name: 'xxx'+i, price: 1}
  })

  // 批量添加
  ret = await Fruit.bulkCreate(
    data,
    {
      // 插入的时候如果主键冲突就执行更新操作
      updateOnDulicate: ['name']
    }
  )
})();

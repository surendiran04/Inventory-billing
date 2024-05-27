const dbConfig = require("./config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize; 
db.Admin = require("./admin")(sequelize, Sequelize);
db.Customer = require("./customer")(sequelize, Sequelize);
db.Order = require("./order")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.OrderItem = require("./orderitem")(sequelize, Sequelize);
db.Otp = require("./otp")(sequelize, Sequelize);
db.OrderStatus = require("./orderstatus")(sequelize, Sequelize);

db.sequelize.sync({ force :false, alter:true }).then(() => {
  console.log("database connected ");
});

module.exports = db;

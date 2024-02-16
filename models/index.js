const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.questionbank = require("./qustion.model")(sequelize, Sequelize);

db.option = require("./option.model")(sequelize, Sequelize);
db.fav = require("./fav.model")(sequelize, Sequelize);
db.score = require("./score.model")(sequelize, Sequelize);
db.image = require("./img.model")(sequelize, Sequelize);

db.option.belongsTo(db.questionbank, { foreignKey: "fk_questid", targetKey: "questid", onDelete: 'cascade' });
db.questionbank.hasOne(db.option, { foreignKey: "fk_questid", targetKey: "questid" });
module.exports = db;
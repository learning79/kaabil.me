//import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../Config/db.config.js";
const dbConfig = require("../Config/db.config.js");
//import Sequelize from "sequelize";
const Sequelize = require("sequelize")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
  //  createDatabase: true // This will create the database automatically
  },
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

 db.lesson = require("./lesson.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
module.exports = db;
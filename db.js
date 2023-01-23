require("dotenv").config()

const Sequelize = require("sequelize")
const sequelize = new Sequelize(process.env.DB_BASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mariadb",
    define: {
        timestamps: false
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.customers = require("./models/Customer")(sequelize, Sequelize)

module.exports = db
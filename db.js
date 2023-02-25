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

db.customers = require("./models/Customer")(sequelize, Sequelize, db.bookings, db.services, db.barbers)  
db.services = require("./models/Service")(sequelize, Sequelize, db.bookings, db.customers)
db.barbers = require("./models/Barber")(sequelize, Sequelize, db.bookings)
db.bookings = require("./models/Booking")(sequelize, Sequelize, db.customers, db.services, db.barbers)



async function Sync() {
    console.log("Begin sync");
    //await sequelize.sync({force: true}) //Erase all and recreate
    await sequelize.sync({alter: true}) //Erase all and recreate
    console.log("Sync Done")
}

module.exports = {db, Sync}
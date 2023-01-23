module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id_customer: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
        },
        lastName: {
            type: Sequelize.STRING,
        }
    })

    return Customer 
}
module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
        id_customer: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        mail: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    

    return Customer 
}
module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define("service", {
        id_service: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        serviceName:{
            type: Sequelize.STRING,
        }
    })
    
    return Service
}
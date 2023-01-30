module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        id_booking: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_customer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_service: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_barber: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
        
     return Booking

}

/*module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        id_booking: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        id_customer: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_service: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        id_barber: {
            type: Sequelize.INTEGER,
            allowNull: false
        }   
    });
  
    Booking.belongsTo(Customer, { foreignKey: 'id_customer', as: 'firstName' });
    Booking.belongsTo(Service, { foreignKey: 'id_service', as: 'serviceName' }); 
    Booking.belongsTo(Barber, { foreignKey: 'id_barber', as: 'barberName' });

    return Booking;
}*/
  
  
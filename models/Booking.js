module.exports = (sequelize, Sequelize, Customer, Service, Barber) => {
    const Booking = sequelize.define("booking", {
        id_booking: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true}
        },
        bookingTime: {
            type: Sequelize.DataTypes.TIME,
            allowNull: false,
            /* validate: {
                isTime: true} */
        },
        id_customer: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Customer,
                key: "id_customer"
            }
        },
        id_service: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Service,
                key: "id_service"
            }
        },
        id_barber: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Barber,
                key: "id_barber"
            }
        }
    })

    Customer.hasMany(Booking, {foreignKey: "id_customer"});
    Booking.belongsTo(Customer, { foreignKey: 'id_customer'});
    Customer.belongsToMany(Service, {through: Booking});
    Customer.belongsToMany(Barber, {through: Booking});

    Service.hasMany(Booking, { foreignKey: 'id_service'});
    Booking.belongsTo(Service, { foreignKey: 'id_service'});
    Service.belongsToMany(Customer, {through: Booking});

    Barber.hasMany(Booking, { foreignKey: 'id_barber'});
    Booking.belongsTo(Barber, { foreignKey: 'id_barber'});
    Barber.belongsToMany(Customer, {through: Booking});
    
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
  
  



/* Версия в классе

module.exports = (sequelize, Sequelize, Customer, Service, Barber) => {
    const Booking = sequelize.define("booking", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingTime: {
            type: Sequelize.DATE,
            allowNull: false
        },
        customerId: {
            type: Sequelize.INTEGER,
        },
        serviceId: {
            type: Sequelize.INTEGER,
            references: {
                model: Service,
            }
        },
        barberId: {
            type: Sequelize.INTEGER,
            references: {
                model: Barber,
            }
        }
    })

    Booking.hasMany(Customer);
    Customer.hasOne(Booking);

    Booking.hasMany(Barber);
    Barber.hasOne(Booking);

    Booking.hasMany(Service);
    Service.hasOne(Booking);

     return Booking
}*/
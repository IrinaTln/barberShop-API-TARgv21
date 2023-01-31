module.exports = (sequelize, Sequelize, Customer, Service, Barber) => {
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
            references: {
                model: Customer,
                key: "id_customer"
            }
        },
        id_service: {
            type: Sequelize.INTEGER,
            references: {
                model: Service,
                key: "id_service"
            }
        },
        id_barber: {
            type: Sequelize.INTEGER,
            references: {
                model: Barber,
                key: "id_barber"
            }     
        }

    })

    Booking.belongsTo(Customer, { foreignKey: 'id_customer', as: 'firstName' });
    Booking.belongsTo(Service, { foreignKey: 'id_service', as: 'serviceName' }); 
    Booking.belongsTo(Barber, { foreignKey: 'id_barber', as: 'barberName' });
        
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
}

// моя версия
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
    });
  
    Booking.belongsTo(Customer, { foreignKey: 'id_customer', as: 'firstName' });
    Booking.belongsTo(Service, { foreignKey: 'id_service', as: 'serviceName' }); 
    Booking.belongsTo(Barber, { foreignKey: 'id_barber', as: 'barberName' });

    return Booking;
}*/
  
  
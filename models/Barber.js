module.exports = (sequelize, Sequelize, Booking) => {
    const Barber = sequelize.define("barber", {
        id_barber: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        barberName: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })

    return Barber 
}

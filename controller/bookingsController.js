const { db }= require('../db');
const Bookings = db.bookings;
const Customer = db.customers;
const Service = db.services;
const Barber = db.barbers;

/*exports.getAll = async (req, res) =>{
const bookings = await Bookings.findAll({attributes:["id_booking", "bookingTime", "id_customer", "id_service", "id_barber"]})
if (bookings.length == 0){
    res.send({"message":"No bookings exist"})
} else {
    res.send(JSON.stringify(bookings))
    }
}*/

exports.getAll = async (req, res) => {
    try {
      const bookings = await Bookings.findAll({
        include: [
          { model: Customer, as: 'firstName'},
          { model: Service, as: 'serviceName'},         
          { model: Barber, as: 'barberName'},
        ],
      });
      res.send(JSON.stringify(bookings));
    } catch (error) {
      res.status(500).send({"message": "Ira, there is an error"});
    }
  };
  

exports.createNew = async (req, res) =>{   
    res.send({"message": "Not implemented yet"})
}

exports.getById = async (req, res) =>{
    const booking = await Bookings.findByPk(req.params.id_booking)
    if(booking === null){
        res.status(404).send({"error": "No booking found"})
    } else {
        res.send(booking)
    }
}

exports.updateById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

exports.deleteById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

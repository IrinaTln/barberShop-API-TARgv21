const { db }= require('../db');
const Bookings = db.bookings;
const Customer = db.customers;
const Service = db.services;
const Barber = db.barbers;
const { getBaseUrl } = require('./helpers');

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
          { model: Customer, as: 'Customer'},
          { model: Service, as: 'Service'},         
          { model: Barber, as: 'Barber'},
        ],
      });
      res.send(JSON.stringify(bookings));
    } catch (error) {
      res.status(500).send({"message": "Ira, there is an error"});
    }
  };
  

  exports.createNew = async (req, res) =>{
    let booking

    try{
      booking = await Bookings.create(req.body, 
            {
                logging:console.log, 
                fields: ["bookingDate","bookingTime", "id_customer", "id_service", "id_barber"]
            })
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("BarbersCreate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }
    if(booking===null){
        res.status(400).send({"error": "Invalid input, missing required params"})
        return
    }
    res.status(201)
    .location(`${getBaseUrl(req)}/customers/${booking.id_booking}`)
    .json(booking)   
}

exports.getById = async (req, res) =>{
    const booking = await Bookings.findByPk(req.params.id_booking, {
      include: [
        { model: Customer, as: 'Customer'},
        { model: Service, as: 'Service'},         
        { model: Barber, as: 'Barber'},
      ],
    })
    if(booking === null){
        res.status(404).send({"error": "No booking found"})
    } else {
        res.send(booking)
    }
}

exports.updateById = async (req, res) =>{
  let booking = await Bookings.findByPk(req.params.id_booking, {logging: console.Log})
  if(booking === null){
      res.status(404).send({"error": "No booking found"})
      return
  } 
  try{
    booking = await booking.update(req.body, {logging:console.log})
  } catch (error){
      if (error instanceof db.Sequelize.ValidationError){
          res.status(400).send({"error": error.errors.map((item)=> item.message)})        
      }else{
          console.log("BookingsUpdate", error) 
          res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
      }
      return
  }
  res.status(200)
  .location(`${getBaseUrl(req)}/bookings/${booking.id_booking}`)
  .json(booking)
}

exports.deleteById = async (req, res) =>{
  const booking = await Bookings.findByPk(req.params.id_booking, {logging: console.Log})
  if(booking === null){
      res.status(404).send({"error": "No booking found"})
      return
  } 
  try{
      const deleted = await booking.destroy()
  }
  catch (error){
      console.log("BookingsDelete", error)
      res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})
      return
  }
  res.status(204).send()
}
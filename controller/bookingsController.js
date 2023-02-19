const { db }= require('../db');
const Bookings = db.bookings;
const Customer = db.customers;
const Service = db.services;
const Barber = db.barbers;
const { getBaseUrl } = require('./helpers');
const QueryTypes = db.Sequelize.QueryTypes

exports.getAll = async (req, res) => {
  const sql = `SELECT bookings.id_booking, bookings.bookingDate, 
              bookings.bookingTime, customers.customerName, customers.phone, 
              customers.mail, services.serviceName, barbers.barberName
              FROM bookings
              JOIN customers ON bookings.id_customer = customers.id_customer
              JOIN services ON bookings.id_service = services.id_service
              JOIN barbers ON bookings.id_barber = barbers.id_barber;`
  const sqlResult = await db.sequelize.query(sql, { type: QueryTypes.SELECT })
  if (sqlResult.length === 0) {
    res.send({ error: "No booking stored." })
    return
  }
  res.send(sqlResult)
}

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
        }
        else{
            console.log("BookingsCreate", error) 
            res.status(500).send({"error": "Something went wrong on our side. Sorry :("})          
        }
        return
    }
    res.status(201)
    .location(`${getBaseUrl(req)}/bookings/${booking.id_booking}`)
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

exports.getBooktedTime = async (req, res) =>{
  const booking = await Bookings.findByPk(req.params.id_booking, {
    include: [     
      { model: Barber, as: 'Barber'},
    ],
  })
  if(booking === null){
      res.status(404).send({"error": "No booking found"})
  } else {
      const sql = `SELECT bookings.bookingDate, 
                  bookings.bookingTime, barbers.barberName
                  FROM bookings
                  JOIN barbers ON bookings.id_barber = barbers.id_barber
                  WHERE barbers.id_barber = ${booking};`
const sqlResult = await db.sequelize.query(sql, { type: QueryTypes.SELECT })
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
          res.status(500).send({"error": "Something went wrong on our side. Sorry :("})          
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
      res.status(500).send({"error": "Something went wrong on our side. Sorry :("})
      return
  }
  res.status(204).send()
}
const { db }= require('../db');
const Customers =db.customers

exports.getAll = async (req, res) =>{
const customers = await Customers.findAll({attributes: ["id_customer", "firstName", "lastName"]})
res.send(JSON.stringify(customers))
}
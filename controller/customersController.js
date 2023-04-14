const { request } = require('express');
const { db }= require('../db');
const Services =db.services;
const Bookings = db.bookings;
const Barbers = db.barbers;
const { getBaseUrl } = require('./helpers');

const Customers =db.customers

exports.getAll = async (req, res) =>{
    const customers = await Customers.findAll({attributes: ["id_customer", "customerName", "phone", "mail"]})
    if(customers.length === 0){
        res.send({"message": "No customers found"})
    } else {
        res.send(JSON.stringify(customers))
    }
}

exports.createNew = async (req, res) =>{
    let customer

    try{
        customer = await Customers.create(req.body, 
            {
                logging:console.log, 
                fields: ["customerName", "phone", "mail"]
            })
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("CustomersCreate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }

    if(customer===null){
        res.status(400).send({"error": "Invalid input, missing required params"})
        return
    }
    res.status(201)
    .location(`${getBaseUrl(req)}/customers/${customer.id_customer}`)
    .json(customer)   
}
exports.getById = async (req, res) => {
    console.log("getById", req.params.id_customer)
    const customer = await Customers.findByPk(req.params.id_customer, {
      logging: console.log,
    include: {
        model: Bookings,
        attributes: ["bookingDate", "bookingTime"],
            include: [{ 
                model: Services,
                attributes: ["serviceName"]}, { 
                model: Barbers,
                attributes: ["barberName"]},
            ]}
    })
    if (customer === null) {
        console.log("getById", req.params.id_customer)
      res.status(404).send({ error: "Customer not found" + req.params.id_customer })
    } else {
      res.send(customer)
    }
  }

/*exports.getById = async (req, res) =>{
    const customer = await Customers.findByPk(req.params.id_customer, {logging: console.Log})
        if(customer === null){
        res.status(404).send({"error": "No customer found"})
    } else {
        res.send(customer)
    }
}*/

exports.updateById = async (req, res) =>{
    let customer = await Customers.findByPk(req.params.id_customer, {logging: console.Log})
    if(customer === null){
        res.status(404).send({"error": "No customer found"})
        return
    } 
    try{
        customer = await customer.update(req.body, {logging:console.log})
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("CustomersUpdate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }
    res.status(200)
    .location(`${getBaseUrl(req)}/customers/${customer.id_customer}`)
    .json(customer)
}

exports.deleteById = async (req, res) =>{
    const customer = await Customers.findByPk(req.params.id_customer, {logging: console.Log})
    if(customer === null){
        res.status(404).send({"error": "No customer found"})
        return
    } 
    try{
        const deleted = await customer.destroy()
    }
    catch (error){
        console.log("CustomersDelete", error)
        res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send()
}
const { request } = require('express');
const { db }= require('../db');
const { getBaseUrl } = require('./helpers');

const Customers =db.customers

exports.getAll = async (req, res) =>{
    const customers = await Customers.findAll({attributes: ["id_customer", "firstName", "lastName"]})
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
                fields: ["firstName", "lastName", "phone", "mail"]
            })
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("CustomersCreate", error) 
            res.status(500).send({"error": "Somtheng went wrong on our side. Sorry :("})          
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

exports.getById = async (req, res) =>{
    const customer = await Customers.findByPk(req.params.id_customer, {logging: console.Log})
        if(customer === null){
        res.status(404).send({"error": "No customer found"})
    } else {
        res.send(customer)
    }
}

exports.updateById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

exports.deleteById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

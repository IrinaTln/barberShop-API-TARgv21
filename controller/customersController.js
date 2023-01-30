const { request } = require('express');
const { db }= require('../db');
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
    res.send({"message": "Not implemented yet"})
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

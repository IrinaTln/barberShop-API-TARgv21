const { db }= require('../db');
const Services =db.services

exports.getAll = async (req, res) =>{
const services = await Services.findAll({attributes:["id_service", "serviceName"]})
if (services.length == 0){
    res.send({"message":"No services exist"})
} else {
    res.send(JSON.stringify(services))
    }
}

exports.createNew = async (req, res) =>{   
    res.send({"message": "Not implemented yet"})
}

exports.getById = async (req, res) =>{
    const service = await Services.findByPk(req.params.id_service)
    if(service === null){
        res.status(404).send({"error": "No service found"})
    } else {
        res.send(service)
    }
}

exports.updateById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

exports.deleteById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}

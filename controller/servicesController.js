const { db }= require('../db');
const Services =db.services

exports.getAll = async (req, res) =>{
const services = await Services.findAll({attributes:["id_service", "ServiceName"]})
if (services.length == 0){
    res.send({"message":"No services exist"})
} else {
    res.send(JSON.stringify(services))
    }

}
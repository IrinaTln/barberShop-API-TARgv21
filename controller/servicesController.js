const { db }= require('../db');
const Services =db.services
const { getBaseUrl } = require('./helpers');

exports.getAll = async (req, res) =>{
const services = await Services.findAll({attributes:["id_service", "serviceName"]})
if (services.length == 0){
    res.send({"message":"No services exist"})
} else {
    res.send(JSON.stringify(services))
    }
}

exports.createNew = async (req, res) =>{
    let service

    try{
        service = await Services.create(req.body, 
            {
                logging:console.log, 
                fields: ["serviceName", "servicePrice"]
            })
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("ServicesCreate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }

    if(service===null){
        res.status(400).send({"error": "Invalid input, missing required params"})
        return
    }
    res.status(201)
    .location(`${getBaseUrl(req)}/services/${service.id_service}`)
    .json(service)   
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
    let service = await Services.findByPk(req.params.id_service, {logging: console.Log})
    if(service === null){
        res.status(404).send({"error": "No service found"})
        return
    } 
    try{
        service = await service.update(req.body, {logging:console.log})
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("ServicesUpdate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }
    res.status(200)
    .location(`${getBaseUrl(req)}/services/${service.id_service}`)
    .json(service)
}

exports.deleteById = async (req, res) =>{
    const service = await Services.findByPk(req.params.id_service, {logging: console.Log})
    if(service === null){
        res.status(404).send({"error": "No service found"})
        return
    } 
    try{
        const deleted = await service.destroy()
    }
    catch (error){
        console.log("ServicesDelete", error)
        res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send()
}

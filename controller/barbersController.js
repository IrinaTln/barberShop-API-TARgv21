const { db }= require('../db');
const Barbers =db.barbers
const { getBaseUrl } = require('./helpers');

exports.getAll = async (req, res) =>{
const barbers = await Barbers.findAll({attributes:["id_barber", "barberName"]})
if (barbers.length == 0){
    res.send({"message":"No barbers exist"})
} else {
    res.send(JSON.stringify(barbers))
    }
}

exports.createNew = async (req, res) =>{
    let barber

    try{
        barber = await Barbers.create(req.body, 
            {
                logging:console.log, 
                fields: ["barberName"]
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

    if(barber===null){
        res.status(400).send({"error": "Invalid input, missing required params"})
        return
    }
    res.status(201)
    .location(`${getBaseUrl(req)}/services/${barber.id_barber}`)
    .json(barber)   
}

exports.getById = async (req, res) =>{
    const barber = await Barbers.findByPk(req.params.id_barber)
    if(barber === null){
        res.status(404).send({"error": "No barber found"})
    } else {
        res.send(barber)
    }
}

exports.updateById = async (req, res) =>{
    let barber = await Barbers.findByPk(req.params.id_barber, {logging: console.Log})
    if(barber === null){
        res.status(404).send({"error": "No barber found"})
        return
    } 
    try{
        barber = await barber.update(req.body, {logging:console.log})
    } catch (error){
        if (error instanceof db.Sequelize.ValidationError){
            res.status(400).send({"error": error.errors.map((item)=> item.message)})        
        }else{
            console.log("BarbersUpdate", error) 
            res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})          
        }
        return
    }
    res.status(200)
    .location(`${getBaseUrl(req)}/barbers/${barber.id_barber}`)
    .json(barber)
}

exports.deleteById = async (req, res) =>{
    const barber = await Barbers.findByPk(req.params.id_barber, {logging: console.Log})
    if(barber === null){
        res.status(404).send({"error": "No barber found"})
        return
    } 
    try{
        const deleted = await barber.destroy()
    }
    catch (error){
        console.log("BarbersDelete", error)
        res.status(500).send({"error": "Somthing went wrong on our side. Sorry :("})
        return
    }
    res.status(204).send()
}
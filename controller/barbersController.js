const { db }= require('../db');
const Barbers =db.barbers

exports.getAll = async (req, res) =>{
const barbers = await Barbers.findAll({attributes:["id_barber", "barberName"]})
if (barbers.length == 0){
    res.send({"message":"No barbers exist"})
} else {
    res.send(JSON.stringify(barbers))
    }
}

exports.createNew = async (req, res) =>{   
    res.send({"message": "Not implemented yet"})
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
    res.send({"message": "Not implemented yet"})
}

exports.deleteById = async (req, res) =>{
    res.send({"message": "Not implemented yet"})
}
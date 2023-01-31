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
            res.status(500).send({"error": "Somtheng went wrong on our side. Sorry :("})          
        }
        return
    }
}

/*exports.createNew = async (req, res) =>{   
    res.send({"message": "Not implemented yet"})
}*/

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
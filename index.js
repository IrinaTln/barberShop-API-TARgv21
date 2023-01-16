require("dotenv").config()
const app = require("express")()
const mysql = require("mysql")
const port = process.env.APP_PORT

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE
})

connection.connect(function(err){
    if(err) throw err
    connection.query("SELECT * FROM customers", 
    function(err, result, fields){
        if(err) throw err
        console.log(result)
    })
})

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
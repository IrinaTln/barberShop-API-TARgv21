require("dotenv").config()
const app = require("express")()
const mariadb = require("mariadb")
const port = process.env.APP_PORT

const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./docs/swagger.json");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_BASE,
    connectionLimit: 5
})


app.get("/customers", async (rec, res) =>{
    let conn
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id, CONCAT(firstname, ' ', lastname) AS name from customers")
        res.send(JSON.stringify(rows))
    } catch (error) {
        console.log(error)
    }finally{
        conn.end()
    }
})



app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
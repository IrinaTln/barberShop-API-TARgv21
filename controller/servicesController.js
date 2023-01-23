app.get("/services", async (req, res) =>{
    let conn
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id_service, ServiceName FROM services")
        res.send(JSON.stringify(rows))
    }catch (error) {
        console.log(error)
    } finally{
        conn.end()
    }
})
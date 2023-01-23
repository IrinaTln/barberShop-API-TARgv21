exports.getAll = async (req, res) =>{
    let conn
    try{
        conn = await pool.getConnection()
        const rows = await conn.query("SELECT id_customer, firstName, lastName from customers")
        res.send(JSON.stringify(rows))
    } catch (error) {
        console.log(error)
    }finally{
        conn.end()
    }
}
require("dotenv").config()
const express = require("express")
const app = express()
const mariadb = require("mariadb")
const port = process.env.APP_PORT

const swaggerUi = require("swagger-ui-express")
///const swaggerDocument = require("./docs/swagger.json");
const yamljs = require("yamljs");
const swaggerDocument = yamljs.load("./docs/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json())

require("./routes/app_routes")(app)

app.listen(port, async () => {
    await require("./db").Sync()
    console.log(`API up at: http://localhost:${port}`)
})
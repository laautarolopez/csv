const express = require("express")
const usersRoutes = require('./routes/users.routes.js')
const creditsRoutes = require('./routes/credits.routes.js')
const swaggerDocs = require('./swagger/swagger.js')
const { runSeed } = require("./db/seed.js")

const app = express()

app.use(express.json())
runSeed()

app.use('/api', usersRoutes)
app.use('/api', creditsRoutes)
swaggerDocs(app)
app.use((req, res) => res.sendStatus(404))

module.exports = app
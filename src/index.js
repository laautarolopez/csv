const app = require('./app.js')

const port = process.env.PORT || 4000

const server = app.listen(port)
console.log('Server on port', port)

module.exports = { app, server }
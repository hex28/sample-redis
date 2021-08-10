const express = require('express')
const port = process.env.port || 8080
const routes = require('./routes');
require('dotenv').config()

const app = express()

app.use('/', routes)

app.listen(port, () => {
    console.log('server started on port: ' + port)
})

module.exports = app
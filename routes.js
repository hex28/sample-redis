var express = require('express');
var app = express();
require('dotenv').config('./env')

// Defining all the routes
var index = require('./routes/index');
const users = require('./routes/users');

app.use(express.json())


// Linking all the routes
app.use('/', index);
app.use('/users', users)

module.exports = app;
const express = require('express');
const app = express();
require('dotenv').config();
const config = require('./config/Constant');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./config/Logger');



app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('combined', { stream: logger.stream }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

//Routes which should handle request
app.use('/users', require('./routes/users'));



module.exports = app;
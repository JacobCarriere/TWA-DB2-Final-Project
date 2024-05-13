// load env file
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { connect } = require('./database/database');

// route imports
const graphRoutes = require('./routes/graphs');

// import for client side
const path = require('path');

// Below were things already there
app.use(cors());
app.use(morgan('tiny')); // loger
app.use(express.json()); // body-parcer

// this is the client route
// app.use('/', express.static(path.join(__dirname, 'dist')));

// middleware for routes are below
app.use('/', graphRoutes)

// If not env, use port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    connect()
    console.log("Server listening on port " + port)
})
const mongoose = require('mongoose');

// Connection URL
const databaseName = 'testImage' // change the database name. Ask Joshua
const url = `${process.env.DB_HOST}/${databaseName}`; // edit this into this later: `${process.env.DB_HOST}/${databaseName}`;

async function connect() {
    // Use connect method to connect to the server
    await mongoose.connect(url);
    console.log('Connected successfully to MongoDB database');

    return 'done.';
}

// We export the connect method and the collection reference
module.exports = {
    connect
}
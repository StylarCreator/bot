const mongoose = require('mongoose');
const fs = require('fs');
const log = require('./logger');

module.exports = async function handleMongo(connectionuri) {
    const models = fs.readdirSync(`./src/models`).filter((file) => file.endsWith(".js")).length;

    const connection = await mongoose.connect(connectionuri, { useNewUrlParser: true });

    if(connection) {
        return log(`MongoDB connected; ${models} models loaded.`);
    } else {
        return log(`An error occured whilst connecting to MongoDB.`, true);
    }
}
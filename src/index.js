require('dotenv').config();
const StylarClient = require('./utils/StylarClient');

new StylarClient().init({
    token: process.env.TOKEN
});
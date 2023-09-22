require('dotenv').config();
const Discord = require('discord.js');
const handleEvents = require('./eventhandler');
const handleCmds = require('./commandhandler');
const handleMongo = require('./mongohandler');

class StylarClient {
    async init({
        token
    }) {
        const client = new Discord.Client({
            intents: [32767]
        });

        client.commands = new Discord.Collection();
        
        client.login(process.env.TOKEN).then(() => {
            handleEvents(client);
            handleCmds(client);
            handleMongo(process.env.MONGO);
        });
    }
}

module.exports = StylarClient;
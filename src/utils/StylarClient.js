require('dotenv').config();
const Discord = require('discord.js');
const handleEvents = require('./eventhandler');
const handleCmds = require('./commandhandler');

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
        });
    }
}

module.exports = StylarClient;
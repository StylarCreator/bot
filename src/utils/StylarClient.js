require('dotenv').config();
const Discord = require('discord.js');
const handleEvents = require('./eventhandler');
const handleCmds = require('./commandhandler');
const handleMongo = require('./mongohandler');

class StylarClient {
    async init({
        token
    }) {
        const { IntentsBitField } = Discord;
        const client = new Discord.Client({
            intents: [
                IntentsBitField.Flags.MessageContent,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildEmojisAndStickers,
                IntentsBitField.Flags.GuildModeration,
                IntentsBitField.Flags.GuildPresences,
                IntentsBitField.Flags.Guilds,
            ]
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
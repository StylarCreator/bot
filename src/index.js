const Discord = require('discord.js');
const dotenv = require('dotenv').config();
const handleEvents = require('./utils/eventhandler');
const logger = require('./utils/logger');

const client = new Discord.Client({
    intents: [32767]
});

client.on('ready', async(client) => {
    client.user.setActivity({
        name: `https://www.github.com/StylarBot/bot`,
        type: Discord.ActivityType.Custom
    });

    logger(`${client.user.tag} logged in.`)
});

client.login(process.env.TOKEN).then(() => {
    handleEvents(client);
});
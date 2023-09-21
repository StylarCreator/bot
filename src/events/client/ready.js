const { Client, ActivityType } = require('discord.js');
const log = require('../../utils/logger');

module.exports = {
    name: 'ready',

    /**
     * 
     * @param {Client} client
     */

    async execute(client) {
        client.user.setActivity({
            name: `github.com/StylarBot/bot`,
            type: ActivityType.Custom
        });
        
        return log(`${client.user.tag} logged in.`)
    }
}
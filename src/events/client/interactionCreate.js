const { ChatInputCommandInteraction, Client, InteractionType } = require('discord.js');
const reply = require('../../utils/reply');

module.exports = {
    name: 'interactionCreate',

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        if(interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return reply(interaction, `That is not a valid command.`, '🚫');

            try {
                await command.execute(interaction, client);
            } catch (err) {
                return reply(interaction, `${err}`, `🚫`);
            }
        } else return;
    }
}
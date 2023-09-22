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
        let missingPermissions = [];
        if(interaction.type === InteractionType.ApplicationCommand) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return reply(interaction, `That is not a valid command.`, '🚫');

            if(command.clientPermissions.length > 0) {
                command.clientPermissions.forEach((permission) => {
                    if(!interaction.guild.members.me.permissions.has(permission)) missingPermissions.push(permission);
                });
            }

            if(missingPermissions.length > 0)
            return reply(interaction, `I do not have the following permission(s): ${missingPermissions.join(', ')}`, '🚫', true);

            try {
                await command.execute(interaction, client);
            } catch (err) {
                return reply(interaction, `${err}`, `🚫`);
            }
        } else return;
    }
}
const { ChatInputCommandInteraction, Client, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    clientPermissions: ['Administrator'],
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test command')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */

    async execute(interaction, client) {
        
    }
}
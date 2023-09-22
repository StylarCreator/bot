const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get info on many aspects of Discord!')
}
const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, Client, EmbedBuilder } = require('discord.js');
const ms = require('ms');
const reply = require('../../utils/reply');

module.exports = {
    clientPermissions: ['BanMembers', 'KickMembers', 'ModerateMembers', 'ManageMessages'],
    data: new SlashCommandBuilder()
    .setName('member')
    .setDescription('Stylar\'s advanced member management commands!')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addSubcommand((sub) =>
        sub.setName('ban')
        .setDescription('Ban a member from the server.')
        .addUserOption((opt) =>
            opt.setName('user')
            .setDescription('The user you want to ban from the server.')
            .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('deletemessages')
            .setDescription('Specify an amount of time you want the messages from this user to be deleted from! (e.g. 2h, 2d)')
        )
        .addStringOption((opt) =>
            opt.setName('reason')
            .setDescription('The reason for banning the user.')
            .setMaxLength(1024)
        )
    )
    .addSubcommand((sub) =>
        sub.setName('kick')
        .setDescription('Kick a member from the server.')
        .addUserOption((opt) =>
            opt.setName('user')
            .setDescription('The user you want to kick from the server.')
            .setRequired(true)
        )
        .addStringOption((opt) =>
            opt.setName('reason')
            .setDescription('The reason for banning the user.')
            .setMaxLength(1024)
        )
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        const { options } = interaction;
        const user = options.getUser('user');
        const deletemessages = options.getString('deletemessages');
        const reason = options.getString('reason') || "No reason.";
    }
}
const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, ChannelType } = require('discord.js');
const reply = require('../../utils/reply');

module.exports = {
    clientPermissions: ['ManageMessages'],
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear all messages from a channel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addChannelOption((opt) =>
        opt.setName('channel')
        .setDescription('The channel you want to clear all messages from.')
        .addChannelTypes(ChannelType.GuildText)
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        if(channel.type === ChannelType.GuildText) {
            await channel.clone().then(async (ch) => {
                const msg = await ch.send({
                    content: `\`\`\`${channel.name} has been cleared all of all of its messages.\`\`\``
                });

                await channel.delete();

                setTimeout(() => {
                    msg.delete();
                }, 3000);
            });
        } else return reply(interaction, `The channel you have selected is not a Guild text channel.`, `🚫`);
    }
}
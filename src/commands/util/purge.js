const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    ChannelType,
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder
} = require('discord.js');

module.exports = {
    clientPermission: ['ManageMessages'],
    data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Remove a certain amount of messages from a channel!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((opt) =>
        opt.setName('amount')
        .setDescription('The amount of messages you want to remove.')
        .setMaxValue(100)
        .setRequired(true)
    )
    .addChannelOption((opt) =>
        opt.setName('channel')
        .setDescription('The channel you want to remove the messages from.')
        .addChannelTypes(ChannelType.GuildText)
    )
    .addUserOption((opt) =>
        opt.setName('user')
        .setDescription('The user whos messages you want to clear!')
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');
        const channel = interaction.channel;
        const user = interaction.options.getUser('user');

        if(channel.type !== ChannelType.GuildText) throw "The channel selected is not a Guild Text Channel.";

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        });

        const button = new ButtonBuilder()
        .setCustomId('delete')
        .setStyle(ButtonStyle.Primary)
        .setLabel('🗑️')

        const row = new ActionRowBuilder()
        .addComponents(button)

        if(user) {
            let i = 0;
            const filtered = [];

            await messages.filter((msg) => {
                if(msg.author.id === user.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(async messages => {
                const msg = await interaction.reply({
                    content: `\`\`\`✅ Deleted ${messages.size} sent by ${user.tag}\`\`\``,
                    ephemeral: false,
                    components: [row]
                });

                const collector = await msg.createMessageComponentCollector();

                collector.on('collect', async(results) => {
                    if(results.customId === 'delete') {
                        await msg.delete();
                    } else return;
                });
            });
        } else {
            await channel.bulkDelete(amount, true).then(async messages => {
                const msg = await interaction.reply({
                    content: `\`\`\`✅ Deleted ${messages.size} from ${channel.name}\`\`\``,
                    ephemeral: false,
                    components: [row]
                });

                const collector = await msg.createMessageComponentCollector();

                collector.on('collect', async(results) => {
                    if(results.customId === 'delete') {
                        await msg.delete();
                    } else return;
                });
            });
        }
    }
}
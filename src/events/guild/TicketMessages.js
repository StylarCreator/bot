const { Message, Client, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ticket = require('../../models/Ticket');
const ticketsystem = require('../../models/TicketSystem');

module.exports = {
    name: 'messageCreate',

    /**
     * 
     * @param {Message} message
     * @param {Client} client
     */

    async execute(message, client) {
        const ticketexists = await ticket.findOne({ Guild: message.guildId, Channel: message.channel.id });
        if(!ticketexists) return;

        if(message.author.id === client.user.id) return;
        else {
            const button1 = new ButtonBuilder()
            .setCustomId('yes')
            .setEmoji('✅')
            .setLabel('Confirm')
            .setStyle(ButtonStyle.Success)

            const button2 = new ButtonBuilder()
            .setCustomId('no')
            .setEmoji('❌')
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger)

            const row = new ActionRowBuilder()
            .addComponents(button1, button2)

            if(!ticketexists.Contributors.includes(message.author.id)) {
                const msg = await message.reply({
                    content: `You don't appear to be a valid contributor on this ticket. Would you like to be added?`,
                    components: [row]
                });

                const collector = await msg.createMessageComponentCollector();

                collector.on('collect', async(results) => {
                    if(results.user.id !== message.author.id) return results.reply({ content: `This is not your prompt!`, ephemeral: true });

                    if(results.customId === 'yes') {
                        ticketexists.Contributors.push(message.author.id);
                        ticketexists.save();
                        await msg.edit({
                            content: `You have successfully been added as a Contributor to this ticket.`,
                            components: []
                        });
                    } else {
                        return msg.edit({
                            content: `Operation Aborted.`,
                            components: []
                        });
                    }
                });
            }

            ticketexists.Transcript.push(`${message.author.tag} (${message.author.id}) - ${message.content}`);
            ticketexists.save();
        }
    }
}
module.exports = async function reply(interaction, message, emoji, ephemeral) {
    if(!emoji) emoji === '✅';
    if(!ephemeral) ephemeral === false;

    return interaction.reply({
        content: `\`\`\`${emoji} ${message}\`\`\``,
        ephemeral: ephemeral
    });
}
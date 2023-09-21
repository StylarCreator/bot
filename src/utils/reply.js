module.exports = async function reply(interaction, message, emoji, ephemeral, actionrow) {
    if(!emoji) emoji === '✅';
    if(!ephemeral) ephemeral === false;

    if(actionrow) {
        const msg = await interaction.reply({
            content: `\`\`\`${emoji || "✅"} ${message}\`\`\``,
            ephemeral: ephemeral,
            components: [actionrow]
        });

        return msg;
    } else {
        const msg = await interaction.reply({
            content: `\`\`\`${emoji || "✅"} ${message}\`\`\``,
            ephemeral: ephemeral
        });

        return msg;
    }
}
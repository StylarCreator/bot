const reply = require('./reply');

async function AssignRole(interaction, member, role, clientMember) {
    const validrole = await interaction.guild.roles.cache.get(role.id);
    if(!validrole) return reply(interaction, `That role is not in this server or is not findable.`, '🚫');

    if(role.position >= clientMember.roles.highest.position) return reply(interaction, `That role has a higher role position than my highest role.`, '🚫');

    if(role.position >= interaction.member.roles.highest.position) return reply(interaction, `That role has a higher position than your highest role position.`, '🚫');

    if(member.roles.cache.has(role.id)) return reply(interaction, `That member already has the ${role.name} role.`, '🚫', true);

    try {
        member.roles.add(role.id);
    } catch (err) {
        return reply(interaction, `An error occured: ${err}`, '🚫');
    }

    return reply(interaction, `Successfully added ${role.name} role to ${member.user.tag}`);
}

async function RemoveRole(interaction, member, role, clientMember) {
    const validrole = await interaction.guild.roles.cache.get(role.id);
    if(!validrole) return reply(interaction, `That role is not in this server or is not findable.`, '🚫');

    if(role.position >= clientMember.roles.highest.position) return reply(interaction, `That role has a higher role position than my highest role.`, '🚫');

    if(role.position >= interaction.member.roles.highest.position) return reply(interaction, `That role has a higher position than your highest role position.`, '🚫');

    if(!member.roles.cache.has(role.id)) return reply(interaction, `That member already has the ${role.name} role.`, '🚫', true);

    try {
        member.roles.remove(role.id);
    } catch (err) {
        return reply(interaction, `An error occured: ${err}`, '🚫');
    }

    return reply(interaction, `Successfully removed ${role.name} role from ${member.user.tag}`);
}

async function CheckRole(interaction, member, role) {
    const validrole = await interaction.guild.roles.cache.get(role.id);
    if(!validrole) return reply(interaction, `That role is not in this server or is not findable.`, '🚫');

    if(member.roles.cache.has(validrole.id)) return reply(interaction, `${member.user.tag} does have the ${validrole.name} role.`);
    else return reply(interaction, `${member.user.tag} does not have the ${validrole.name} role`);
}

module.exports = { AssignRole, RemoveRole, CheckRole };
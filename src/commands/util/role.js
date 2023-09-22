const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits } = require('discord.js');
const RoleUtil = require('../../utils/RoleUtil');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Stylar\'s incredible role management utilities!')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
    .addSubcommand((sub) =>
        sub.setName('add')
        .setDescription('Add a role to a user in the server!')
        .addUserOption((opt) =>
            opt.setName('user')
            .setDescription('The user you want to add the role to!')
            .setRequired(true)
        )
        .addRoleOption((opt) =>
            opt.setName('role')
            .setDescription('The role you want to add to the user.')
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
        sub.setName('remove')
        .setDescription('Remove a specified role from a user in the server!')
        .addUserOption((opt) =>
            opt.setName('user')
            .setDescription('The user you want to remove the role from!')
            .setRequired(true)
        )
        .addRoleOption((opt) =>
            opt.setName('role')
            .setDescription('The role you want to remove from the user.')
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
        sub.setName('check')
        .setDescription('Check if a user has a specified role in the server!')
        .addUserOption((opt) =>
            opt.setName('user')
            .setDescription('The user you want to check!')
            .setRequired(true)
        )
        .addRoleOption((opt) =>
            opt.setName('role')
            .setDescription('The role you want to check if the user has.')
            .setRequired(true)
        )
    ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {
        const { options } = interaction;
        const user = options.getUser('user');
        const role = options.getRole('role');
        const clientMember = interaction.guild.members.me;

        const sub = options.getSubcommand();

        const member = await interaction.guild.members.cache.get(user.id);
        if(!member) throw "That member is not in this server.";

        switch(sub) {
            case 'add': {
                await RoleUtil.AssignRole(interaction, member, role, clientMember);
            }
            break;

            case 'remove': {
                await RoleUtil.RemoveRole(interaction, member, role, clientMember);
            }
            break;

            case 'check': {
                await RoleUtil.CheckRole(interaction, member, role);
            }
            break;
        }
    }
}
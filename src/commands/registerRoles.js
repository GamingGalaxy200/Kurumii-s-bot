const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { rolesDB } = require('../database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('registerroles')
        .setDescription('Register new roles for the bots main feature.')
        .addRoleOption(option => 
            option.setName('role_one')
                .setDescription('One of the two required roles.')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role_two')
                .setDescription('One of the two required roles.')
                .setRequired(true))
        .addRoleOption(option => 
            option.setName('role_three')
                .setDescription('The role that will be added when role 1 & 2 are given.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

        run: async ({ interaction }) => {
            const { guild, options } = interaction;
            
            // Correctly retrieve the roles
            const role1 = guild.roles.cache.get(options.getRole('role_one').id);
            const role2 = guild.roles.cache.get(options.getRole('role_two').id);
            const role3 = guild.roles.cache.get(options.getRole('role_three').id);
        
            // Check if the roles exist in the server
            if (!role1 || !role2 || !role3) {
                await interaction.editReply({ content: 'Sorry, one of the roles couldn\'t be found.', ephemeral: true });
                return;
            }
        
            // Adding the role to the database
            rolesDB.run('INSERT OR IGNORE INTO roles (role_one_id, role_two_id, role_three_id, server_id) VALUES (?, ?, ?, ?)', [role1.id, role2.id, role3.id, guild.id], (err) => {
                if (err) {
                    console.error(err);
                    interaction.editReply({ content: 'There was an error adding the roles to the database.', ephemeral: true });
                    return;
                }
        
                interaction.editReply({ content: `The roles have been added to the database!`, ephemeral: true });
            });
        }
}
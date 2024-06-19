const Discord = require('discord.js');
const { getRoleEntriesByServerId } = require('../database');
const { Events } = require('discord.js');

module.exports = {
    name: 'guildMemberUpdate',
    once: false,
    /**
     * 
     * @param {Discord.GuildMember} oldMember
     * @param {Discord.GuildMember} newMember
     * @returns 
     */
    async execute(oldMember, newMember, member) {
        const guildId = newMember.guild.id;

        // Get all role entries for the given server ID from the database
        const roleEntries = await getRoleEntriesByServerId(guildId);

        // For each role configuration, check whether role 1 and role 2 are present
        for (const entry of roleEntries) {
            const { role1Id, role2Id, role3Id } = entry;

            const hasRole1 = member.roles.cache.has(role1Id);
            const hasRole2 = member.roles.cache.has(role2Id);
            const hasRole3 = member.roles.cache.has(role3Id);
        
            // Logic to manage role 3
            if (hasRole1 && hasRole2 && !hasRole3) {
                // Add role 3, if not already present
                member.roles.add(role3Id)
            } else if ((!hasRole1 || !hasRole2) && hasRole3) {
                // Remove role 3, if present
                member.roles.remove(role3Id)
            }
        }
    }
}

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
    async execute(oldMember, newMember) {
        const guildId = newMember.guild.id;

        // Check whether roles have been added or removed
        const addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
        const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));

        // If no role changes, exit
        if (addedRoles.size === 0 && removedRoles.size === 0) return;

        // Get all role entries for the given server ID from the database
        const roleEntries = await getRoleEntriesByServerId(guildId);

        // For each role configuration, check whether role 1 and role 2 are present
        for (const entry of roleEntries) {
            const { role1Id, role2Id, role3Id } = entry;

            const hasRole1 = newMember.roles.cache.has(role1Id);
            const hasRole2 = newMember.roles.cache.has(role2Id);

            // Logic to manage role 3
            if (hasRole1 && hasRole2) {
                // Add role 3, if not already present
                if (!newMember.roles.cache.has(role3Id)) {
                    await newMember.roles.add(role3Id);
                }
            } else {
                // Remove role 3, if present
                if (newMember.roles.cache.has(role3Id)) {
                    await newMember.roles.remove(role3Id);
                }
            }
        }
    }
}

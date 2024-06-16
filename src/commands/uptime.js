const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("How long the bot has been online."),
    run: async ({ client, interaction }) => {
      const uptime = client.uptime
      const duration = getDuration(uptime);
      function getDuration(uptime) {
        const seconds = Math.floor((uptime / 1000) % 60);
        const minutes = Math.floor((uptime / (1000 * 60)) % 60);
        const hours = Math.floor((uptime / (1000 * 60 * 60)) % 24);
        const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
      
        return `${days}d ${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      }
      
      await interaction.editReply(":clock2: Checking the bot's statistics... :clock2:")
      await interaction.followUp({
        embeds: [
          new EmbedBuilder()
            .setColor("#970b0b")
            .setTitle(`${client.user.username} is online since:\n${duration}`)
        ],
      })
    }
};
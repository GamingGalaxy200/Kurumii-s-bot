// Dependencies.
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js")
const yaml = require("js-yaml");
const fs = require("fs")

// Create a new Client
const client = new Client({
    partials: [Partials.Channel, Partials.User, Partials.Message, Partials.Reaction, Partials.GuildMember],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

// Collections
client.commands = new Collection(); // Slash Commands

// Load the config
try {
    client.conf = yaml.load(fs.readFileSync('./src/config.yaml', 'utf8'));
} catch (error) {
    console.log(error);
    process.exit();
}

// Rules for assigning files
const commandfiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"))

// Assign files for commands etc
commandfiles.forEach(commandfile => {
    const command = require(`./commands/${commandfile}`)
    client.commands.set(command.data.name, command)
})
eventFiles.forEach(eventFile => {
    const event = require(`./events/${eventFile}`)
    client.on(event.name, (...args) => event.execute(client, ...args))
})

// Confirmation of successful bot launch and status setting
client.once("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}! Im on ${client.guilds.cache.size} guild(s)!`)
    // Setting the presence
    client.user.setPresence({
        status: 'online'
    });
    client.guilds.cache.get(client.conf.NotifyGuild).channels.cache.get(client.conf.NotifyChannel).send(client.conf.NotifyMessage)
    // Sending a discord message on startup
})

// Error Catcher & slash command handler
client.on("interactionCreate", (interaction) => {
   async function handleCommand() {
       if (!interaction.isCommand()) return

       const slashcmd = client.commands.get(interaction.commandName)
       if (!slashcmd) interaction.reply(client.conf.Invalid)

       await interaction.deferReply({ephemeral: true})
       await slashcmd.run({ client, interaction })
   }
   handleCommand()
})

// Bot login Line
client.login(client.conf.token)
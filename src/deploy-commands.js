const { Client, GatewayIntentBits } = require("discord.js")
const yaml = require("js-yaml");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
});

// Load the config
const fs = require("fs")
try {
    client.conf = yaml.load(fs.readFileSync('./src/config.yaml', 'utf8'));
} catch (error) {
    console.log(error);
    process.exit();
}

const clientId = client.conf.BotApplicationID;
const token = client.conf.token;

const { REST, Routes } = require('discord.js');
const rest = new REST().setToken(token);

const commands = []
const commandfiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"))

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Fetch all guilds where the bot is a member
    const guilds = client.guilds.cache.map(guild => guild.id);

    commandfiles.forEach(commandfile => {
        const command = require(`./commands/${commandfile}`)
        commands.push(command.data.toJSON())
    })

    // Add the commands to all guilds
    guilds.forEach(async guildId => {
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
            console.log(`Successfully registered commands for guild ${guildId}.`);
        } catch (error) {
            console.error(`Error registering commands for guild ${guildId}:`, error);
        }
    });

    // Close the bot connection after adding commands
    client.destroy();
});

client.login(token);
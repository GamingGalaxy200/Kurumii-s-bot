# Kurumii`s bot
The current progress is the foundation of the bot. Currently it is not functional to manage roles.  
guildMemberUpdate.js does not do anything so far.. Later this will be the file managing the roles.
## Overview:

- [Overview:](#overview)
- [How to install the bot:](#how-to-install-the-bot)
- [Warning:](#warning)

## How to install the bot:

1. Download the repository to your machine.  
2. Make sure that the downloaded repository is in a path that **HAS NO SPACES**.    
3. Create a file with the name "config.yaml" and copy the content from the file with the name "example.yaml" into this file (in the same folder).   
4. Replace the placeholders in the "config.yaml" file with your values. 
5. Make sure your bot has all intents enabled in the Discord Developer Portal (under the BOT tab on the left).
6. Make sure you have installed ["node"](https://nodejs.org/en) and ["NPM"](https://www.npmjs.com). For a tutorial click [here](https://phoenixnap.com/kb/install-node-js-npm-on-windows). 
7. Now change in a terminal to the directory / file path where you downloaded the repository. This folder should be named something like "Kurumii-s-bot", not "src" or "commands". 
8. Run "npm install", this will download all the required packages if you have NPM installed. 
9. Execute "npm run deploycommnands" -> "Execute "npm run start", this will first register all commands and then start the bot.
10. bot does not start correctly? Contact the developer with a copy of the error (if available).
    * ➥ I can be found on this [Discord Server](https://discord.gg/EmScKUnaPe) with the Name "Raymond Harrington". Or "galaxy.chris" on Discord.   
11. To be able to use bot, please follow these instructions: [Tutorial](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).

## Warning:
1. Never share the data from the config.yaml file with anyone, this could lead to someone impersonating your bot or exploiting your token.
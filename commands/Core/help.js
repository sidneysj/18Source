const Discord = require("discord.js");
const system = require('../../system.js');

module.exports = {
    name: 'help',
    aliases: [`commands`],
    usage: `${system.config.Prefix}` + "help [command]",
    description: `Shows a list of commands you can use! To go into detail, use ${system.config.Prefix}help [command].`,
    guildOnly: true,
    execute(client, message, args) {

        let color;
        if (message.channel.type === "dm") {

            color = `#7075e4`;

        } else {

            color = message.guild.member(message.author).displayHexColor;
        }

        if (args[0]) {

            var helpEmbed = new Discord.MessageEmbed()
                .setColor(`${color}`)

            let name = args[0].toLowerCase();

            switch (name) {
                case "core":
                    helpEmbed.setTitle(`Core`);
                    helpEmbed.addField(`- **bot**`, `Information about 18.`, true);
                    helpEmbed.addField(`- **help**`, `Shows a list of commands you can use! To go into detail, use ${system.config.Prefix}help [command].`, true);
                    if (message.channel.type === "dm" || message.member.hasPermission('ADMINISTRATOR')) {
                        helpEmbed.addField(`- **guildsettings**`, `View options you can change.`, true);
                    }                   
                    break;
                case "utility":
                    helpEmbed.setTitle(`Utility`);
                    helpEmbed.addField(`- **avatar**`, `Get an image link of your, a server member's, or multiple server member's profile picture.`, true);
                    helpEmbed.addField(`- **server**`, `Check the server stats.`, true);
                    helpEmbed.addField(`- **uptime**`, `Check how long the bot has been online.`, true);
                    helpEmbed.addField(`- **user**`, `Check your or a server member's stats for Discord.`, true);
                    break;
                case "fun":
                    helpEmbed.setTitle(`Fun`);
                    helpEmbed.addField(`- **boo**`, `The bot will send a message saying that a user's joke sucks.`, true);
                    helpEmbed.addField(`- **haha**`, `The bot will send a message saying that a user's joke was funny.`, true);
                    helpEmbed.addField(`- **setcolor**`, `Gives you a special role that would set their display color.`, true);
                    break;
                case "features":
                    helpEmbed.setTitle(`Features`);
                    if (message.channel.type === "dm" || message.member.hasPermission('ADMINISTRATOR')) {
                        helpEmbed.addField(`- **setcolorrole**`, `Change the options to allow or not allow server members setting a color role.`, true);
                        helpEmbed.addField(`- **setvcchat**`, `Set a VC Chat for the bot..`, true);

                    }  
                    break;
                default:
                    const { commands } = message.client;
                    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
                    if (!command) return;

                    helpEmbed.setTitle(`${command.name[0].toUpperCase() + command.name.substr(1)}`);
                    helpEmbed.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    helpEmbed.setDescription(`**Aliases:** ${command.aliases || "None"}\n**Usage:** ${command.usage || `${system.config.Prefix}${command.name}`}\n**Description:** ${command.description || "No Description"}\n**Cool Down:** ${command.coolDown || 0 } Seconds`);
            }

            message.channel.send(helpEmbed);
        }

        if (!args[0]) {

            if (message.channel.type !== "dm") {
                
                let embed = new Discord.MessageEmbed()
                    .setDescription(`${message.author.username} check your dms!\nUse ${system.config.Prefix}**help [command]** for more information about specific commands!`)
                    .setColor(`${color}`)

                message.channel.send(embed);
            }

            let SEmbed = new Discord.MessageEmbed()
                .setTitle(`📚 Help`)
                .setColor(`#7075e4`)
                .setDescription(`18's command types.\nType **${system.config.Prefix}help <Category>** to view those category's commands.`)
                .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .addField(`**✨ Core**`, "The basic and fundamental commands.")
                .addField(`**🎲 Fun**`, "Commands to play around with.", true)
                .addField(`**🌟 Features**`, "Commands that can change how you want the bot to function for yourself.", true)
                .addField(`**📃 Utility**`, "Information base commands.", true)
                .setFooter(`Running on v${system.LatestVersion}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            message.author.send(SEmbed);
        }
    }
}
const Discord = require("discord.js");
const system = require('../../system.js');

const Server = require("../../models/guildServer.js");

module.exports = {
    name: 'guildsettings',
    description: `View options you can change.`,
    aliases: ['serversettings'],
    permissions: "ADMINISTRATOR",
    execute(client, message) {

        Server.findOne({
            ServerID: message.guild.id
        }, (err, sys) => {

            if (err) console.error(err);
            if (!sys) {

                const newServer = new Server({
                    ServerID: message.guild.id,
                    ServerName: message.guild.name
                })

                newServer.save().catch(err => console.error(err));
                console.log('\x1b[34m', `[${client.user.username}] Created a new database for the server, ${message.guild.name}.`, '\x1b[0m');
                return message.channel.send("Created a new database for this server.")
            }

            let colorRole = "❌";
            if (sys.ServerFeatures.allowColorRoles === "true") colorRole = "✅";

            let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(message.guild.member(message.author).displayHexColor)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .addField(`Set Color - ${colorRole}`, `Change this setting to allow or disallow server members to set a color role. (**${system.config.Prefix}setcolorrole**)`);
            if (sys.ServerChannels.vcChatPublicChannel !== undefined) {

                let vcChannel = message.guild.channels.cache.find(c => c.id === sys.ServerChannels.vcChatPublicChannel);
                embed.addField(`VC Chat - ✅`, `A channel dedicated to only voice calls. ${vcChannel} (**${system.config.Prefix}setvcchat**)`, true);
            } else {
                embed.addField(`VC Chat - ❌`, `A channel dedicated to only voice calls. None (**${system.config.Prefix}setvcchat**)`, true);
            }
            message.channel.send(embed);

        })
    }
}
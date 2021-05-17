const Discord = require("discord.js");
const system = require('../../system.js');

const Server = require("../../models/guildServer.js");

module.exports = {
    name: 'setvcchat',
    description: `Set a VC Chat for the bot.`,
    usage: `**${system.config.Prefix}setvcchat** <Channel>.`,
    permissions: "ADMINISTRATOR",
    execute(client, message, args) {

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

            }

            let response = args.join("");
            let channel = message.mentions.channels.first();

            if (!response && !channel) return message.reply(`Be sure to mention the role you want. **${system.config.Prefix}setvcchat <Role.name>**. To remove the current set vc chat, type **${system.config.Prefix}setvcchat remove**.`);
            if (response === "Remove" || response === "remove") {

                sys.ServerChannels.vcChatPublicChannel = "";

                console.log('\x1b[34m', `[${client.user.username}] Updated ServerChannels.vcChat for ${message.guild.name}. It's been set to nothing.`, '\x1b[0m');
                sys.save().catch(err => console.error(err));

                message.channel.send(`Successfully removed the set channel for the VC Chat!`);

            } else if (channel){

                sys.ServerChannels.vcChatPublicChannel = channel.id; 

                console.log('\x1b[34m', `[${client.user.username}] Updated ServerChannels.vcChat for ${message.guild.name}. It's been set to ${channel.name}`, '\x1b[0m');
                sys.save().catch(err => console.error(err));

                message.channel.send(`Successfully set ${channel} as the VC Chat!`);

            } else {

                return message.reply(`Be sure to mention the role you want. **${system.config.Prefix}setvcchat <Role.name>**. To remove the current set vc chat, type **${system.config.Prefix}setvcchat remove**.`);
            }
        })
    }
}
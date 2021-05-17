const Discord = require("discord.js");
const system = require('../../system.js');

const Server = require("../../models/guildServer.js");

module.exports = {
    name: 'setcolorrole',
    description: `Change the options to allow or not allow server members setting a color role.`,
    permissions: "ADMINISTRATOR",
    execute(client, message) {

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        Server.findOne({
            ServerID: message.guild.id
        }, (err, system) => {

            if (err) console.error(err);
            if (!system) {

                const newServer = new Server({
                    ServerID: message.guild.id,
                    ServerName: message.guild.name
                })

                newServer.save().catch(err => console.error(err));
                console.log('\x1b[34m', `[${client.user.username}] Created a new database for the server, ${message.guild.name}.`, '\x1b[0m');
                message.channel.send(`Successfully set **allowColorRole** to **false**.`);

            } else {

                message.channel.send(`Currently, you have set the **allowColorRole** on **${system.ServerFeatures.allowColorRoles}**.\nWould you like to switch variables? React 👍 to confirm your request!`)
                    .then(async msg => {

                        await msg.react('👍');
                        await msg.react('👎');

                        msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                            .then(async collected => {

                                const reaction = collected.first();

                                if (reaction.emoji.name === '👍') {

                                    await msg.delete();

                                    if (system.ServerFeatures.allowColorRoles === "false" && system.ServerFeatures.allowColorRoles) {

                                        system.ServerFeatures.allowColorRoles = system.ServerFeatures.allowColorRoles = "true";

                                    } else {

                                        system.ServerFeatures.allowColorRoles = system.ServerFeatures.allowColorRoles = "false";

                                    }

                                    system.save().catch(err => console.error(err));
                                    message.channel.send(`Successfully set **allowColorRole** to **${system.ServerFeatures.allowColorRoles}**.`);

                                } else {

                                    await msg.delete();
                                    message.channel.send(`The process has been cancelled.`);

                                }
                            })
                            .catch(collected => {

                                msg.delete();
                                message.channel.send('There was no collected reaction that passed the filter within the time limit.');

                            })
                    })
            }
        })
    }
}
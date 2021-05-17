const Discord = require("discord.js");
const system = require('../../system.js');

const Profile = require("../../models/guildUser.js");
const Server = require("../../models/guildServer.js");

module.exports = {
    name: 'setcolor',
    aliases: ['sc'],
    usage: `${system.config.Prefix}` + "setcolor #HEXCODE",
    description: `Gives you a special role that will set their display color.`,
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

            if (sys.ServerFeatures.allowColorRoles === "false" && !message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) {

                return message.reply("Sorry, looks like this feature isn't allowed in this server. Contact your server Administrator to enable it.");
            
            } else if (sys.ServerFeatures.allowColorRoles === "false"){

                return message.reply(`Sorry, looks like this feature isn't allowed in this server. To enable it, type in **${system.config.Prefix}setcolorrole**.`);

            }

            Profile.findOne({
                UserID: message.author.id,
                ServerID: message.guild.id
            }, (err, profile) => {

                let hexCode = args.join("").toLowerCase();
                let botRole = message.guild.roles.cache.find(r => r.name === "18");
                let rp = botRole.position = botRole.position - 1;
                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
                };

                if (hexCode === "none" || hexCode === "remove" || hexCode === "clear") {

                    if (profile) {

                        message.channel.send("**Are you sure you want to remove your color?** React 👍 to confirm your request!")
                            .then(async msg => {

                                await msg.react('👍');
                                await msg.react('👎');

                                msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                                    .then(async collected => {

                                        const reaction = collected.first();

                                        if (reaction.emoji.name === '👍') {

                                            await msg.delete();
                                            console.log('\x1b[34m', `[${client.user.username}] Searching for existing role...`, '\x1b[0m');
                                            let role = message.guild.roles.cache.find(r => r.id === profile.ServerData.activeColor);

                                            if (role) {
                                                role.delete().then(() => {
                                                    console.log('\x1b[34m', `[${client.user.username}] Role founded and deleted from ${message.guild.name}.`, '\x1b[0m');
                                                });
                                            }

                                            profile.ServerData.activeColor = "None"
                                            profile.save().catch(err => console.error(err));
                                            message.channel.send(`Your color has been removed!`);

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

                    } else {

                        message.channel.send("You currently don't have a set color in the database.\nIf you wish to add a color you can choose a color here: https://htmlcolorcodes.com/color-picker/\nPlease make sure to formate it as **setcolor #RRGGBB**");
                    }
                } else {

                    if (!hexCode || hexCode.length === 6) return message.reply(`there was no color provided!\nYou can choose a color here: https://htmlcolorcodes.com/color-picker/\nPlease make sure to formate it as **setcolor #RRGGBB**\nIf you no longer wish to have your own color role type **setcolor none** or **setcolor remove**.`);
                    if (!message.content.includes('#')) return message.reply(`Don't forget to add the **#** at the beginning!`);
                    if (err) system.imperfectRun(client, message, err, `setcolor.js`);

                    let copyHex = hexCode.substr(1);
                    let embed = new Discord.MessageEmbed()
                        .setColor(hexCode)
                        .setAuthor(`${hexCode}`, `https://dummyimage.com/500%20x%20500/${copyHex}/${copyHex}.png`)
                        .setTimestamp(new Date)
                        .setImage(`https://dummyimage.com/600%20x%20400/${copyHex}/${copyHex}.png`)
                        .setDescription(`React 👍 to confirm your request!`);

                    message.channel.send(embed)
                        .then(async msg => {

                            await msg.react('👍');
                            await msg.react('👎');

                            msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                                .then(async collected => {

                                    const reaction = collected.first();

                                    if (reaction.emoji.name === '👍') {

                                        await msg.delete();

                                        if (!profile) {

                                            message.guild.roles.create({ data: { name: hexCode, color: hexCode, position: rp } }).then(result => {

                                                console.log('\x1b[34m', `[${client.user.username}] Created role ${result.name} in ${message.guild.name}.`, '\x1b[0m');
                                                message.member.roles.add(result).then(() => {

                                                    message.channel.send("Your new color has been set!");

                                                    const newProfile = new Profile({
                                                        UserID: message.author.id,
                                                        Username: message.author.username,
                                                        ServerID: message.guild.id,
                                                        ServerData: {
                                                            activeColor: result.id,
                                                            colorArray: [hexCode]
                                                        }
                                                    })

                                                    newProfile.save().catch(err => console.error(err));
                                                })
                                            })

                                        } else {

                                            let role = message.guild.roles.cache.find(r => r.id === profile.ServerData.activeColor);

                                            if (!role && profile) {

                                                message.guild.roles.create({ data: { name: hexCode, color: hexCode, position: rp } }).then(result => {

                                                    console.log('\x1b[34m', `[${client.user.username}] Created role ${result.name} in ${message.guild.name}.`, '\x1b[0m');
                                                    message.member.roles.add(result).then(() => {

                                                        message.channel.send("Your new color has been set!");
                                                        profile.ServerData.activeColor = profile.ServerData.activeColor = result.id;

                                                        profile.save().catch(err => console.error(err));
                                                    })
                                                })
                                            } else {

                                                let role = message.guild.roles.cache.find(r => r.id === profile.ServerData.activeColor);
                                                role.edit({ name: hexCode, color: hexCode }).then(() => {

                                                    console.log('\x1b[34m', `[${client.user.username}] Edited ${message.author.username}'s role color to ${role.name}.`, '\x1b[0m');
                                                    profile.save().catch(err => console.error(err));

                                                    message.channel.send("Your new color has been set!");
                                                })
                                            }
                                        }

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
        })
    }
}
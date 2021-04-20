const Discord = require("discord.js");
const system = require('../../system.js');

const Profile = require("../../models/guild.js");

module.exports = {
    name: 'sethex',
    description: `Change the setting of enabling or disenabling the bot from saving new colors you've set in your color role. All colors saved in this list will be a part of the rainbow. Input ${system.config.Prefix}hexlist to view colors that have been saved.`,
    coolDown: 60,
    execute(client, message) {

        const filter = (reaction, user) => {
            return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };

        Profile.findOne({
            UserID: message.author.id,
            ServerID: message.guild.id
        }, (err, profile) => {

            if (err) console.error(err);
            if (!profile) return;

            message.channel.send(`Currently, you have set the **autosavehex** setting on **${profile.LocalSettings.allowAutoSaveHex}**.\nWould you like to switch variables? React 👍 to confirm your request!`)
                .then(async msg => {

                    await msg.react('👍');
                    await msg.react('👎');

                    msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(async collected => {

                            const reaction = collected.first();

                            if (reaction.emoji.name === '👍') {

                                await msg.delete();

                                if (profile.LocalSettings.allowAutoSaveHex === "false") {

                                    profile.LocalSettings.allowAutoSaveHex = profile.LocalSettings.allowAutoSaveHex = "true";

                                } else {

                                    profile.LocalSettings.allowAutoSaveHex = profile.LocalSettings.allowAutoSaveHex = "false";

                                }
                                profile.save().catch(err => console.error(err));
                                message.channel.send(`Successfully set **autosavehex** to **${profile.LocalSettings.allowAutoSaveHex}**.`);

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
        })
    }
}
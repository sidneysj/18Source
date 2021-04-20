const Discord = require("discord.js");
const system = require('../../system.js');

const Profile = require("../../models/guild.js");

module.exports = {
    name: 'setrainbow',
    description: `Change the setting of enabling or disenabling your color role from randomly changing colors every 12 hours.`,
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

            message.channel.send(`Currently, you have set the **rainbow** on **${profile.LocalSettings.allowRainbowEffect}**.\nWould you like to switch variables? React 👍 to confirm your request!`)
                .then(async msg => {

                    await msg.react('👍');
                    await msg.react('👎');

                    msg.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
                        .then(async collected => {

                            const reaction = collected.first();

                            if (reaction.emoji.name === '👍') {

                                await msg.delete();

                                if (profile.LocalSettings.allowRainbowEffect === "false" && profile.ServerData.activeColor) {

                                    profile.LocalSettings.allowRainbowEffect = profile.LocalSettings.allowRainbowEffect = "true";

                                } else {

                                    profile.LocalSettings.allowRainbowEffect = profile.LocalSettings.allowRainbowEffect = "false";

                                } 

                                profile.save().catch(err => console.error(err));
                                message.channel.send(`Successfully set **rainbow** to **${profile.LocalSettings.allowRainbowEffect}**.`);

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
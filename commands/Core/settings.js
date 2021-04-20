const Discord = require("discord.js");
const system = require('../../system.js');

const Profile = require("../../models/guild.js");

module.exports = {
    name: 'settings',
    description: `View options you can change.`,
    execute(client, message) {

        Profile.findOne({
            UserID: message.author.id,
            ServerID: message.guild.id
        }, (err, profile) => {

            let setRain = "❌"
            let setAuto = "✅"

            if (err) console.error(err);
            if (!profile) return;

            if (profile.LocalSettings.allowRainbowEffect === "true") setRain = "✅";
            if (profile.LocalSettings.allowAutoSaveHex === "false") setAuto = "❌";

            let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(message.guild.member(message.author).displayHexColor)
            .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .addField(`Rainbow - ${setRain} (Premium Servers Only)`, `Change this setting to enable or disable the bot from randomly changing the colors of your color role every 6 hours. (**${system.config.Prefix}setrainbow**)`, true)
            .addField(`AutoSave HexCode - ${setAuto} (Premium Servers Only)`, `Change this setting to enable or disable the bot from saving new colors you've set in your color role. All colors saved in this list will be a part of the rainbow. (**${system.config.Prefix}sethex** | **${system.config.Prefix}hexlist**)`,);

            message.channel.send(embed);
        })
    }
}
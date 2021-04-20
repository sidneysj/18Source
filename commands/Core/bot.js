const Discord = require("discord.js");
const system = require('../../system.js');

module.exports = {
    name: 'bot',
    aliases: [`18`],
    description: `Information about 18.`,
    coolDown: 5,
    guildOnly: true,
    execute(client, message) {

        let embed = new Discord.MessageEmbed()
            .setColor("#7075e4")
            .setAuthor(client.user.username, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .setDescription(`If you need my assistance type **${system.config.Prefix}help**!`)
            .setTitle(`Android 18`)
            .setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setFooter(`Running on v${system.LatestVersion}`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField("Current Version", `v${system.LatestVersion}`)
            .addField("Last Updated", system.LatestUpdate, true)
            .addField("Changelog", `https://github.com/MrTape/Android18/releases/tag/${system.LatestVersion}`, true)
        
            message.channel.send(embed);
    }
}
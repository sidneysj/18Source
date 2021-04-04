const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'server',
    description: "Check the server stats.",
    coolDown: 5,
    execute(client, message) {

        let vLevel = message.guild.verificationLevel.toLowerCase();
        let roleMember = message.guild;
        
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(message.guild.member(message.author).displayHexColor)
            .setThumbnail(message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .addField("Name", message.guild.name, true)
            .addField("Owner", message.guild.owner, true)
            .addField("ID", message.guild.id)
            .addField("Verification Level", vLevel[0].toUpperCase() + vLevel.substr(1), true)
            .addField("Region", message.guild.region.toUpperCase())
            .addField("Channels", message.guild.channels.cache.size, true)
            .addField("Members", message.guild.memberCount, true)
            .addField("Boosts", message.guild.premiumSubscriptionCount, true)
            .addField(`Roles [${roleMember.roles.cache.size}]:`, roleMember.roles.cache.map(s => s).join(" | "))
            .addField(`Server Created:`, `${moment.utc(message.guild.createdAt).format('h:mm:ssa, (dddd) MMMM Do, YYYY')}`);

            if (message.guild.banner) {
                embed.setImage(message.guild.bannerURL({ format: 'png', dynamic: true, size: 1024 }));
            }

        message.channel.send(embed);
    }
}
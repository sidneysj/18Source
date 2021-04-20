const Discord = require("discord.js");
const moment = require("moment");

module.exports = {
    name: 'server',
    description: "Check the server stats.",
    execute(client, message) {

        let vLevel = message.guild.verificationLevel.toLowerCase();
        let roleMember = message.guild;
        let roleMap = roleMember.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" | ")

        if (roleMap.length > 1024) roleMap = "Too many roles to display";
        if (!roleMap) roleMap = "No roles";
        
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
            .addField(`Channels [${message.guild.channels.cache.size}]`,`Category: ${message.guild.channels.cache.filter((c) => c.type === "category").size}\nText: ${message.guild.channels.cache.filter((c) => c.type === "text").size}\nVoice: ${message.guild.channels.cache.filter((c) => c.type === "voice").size}`, true)
            .addField("Members", message.guild.memberCount, true)
            .addField("Server Boosts", `Level: ${message.guild.premiumTier}\nNumber of Boost: ${message.guild.premiumSubscriptionCount}`)
            .addField(`Roles [${roleMember.roles.cache.size}]:`, roleMap) 
            .addField(`Server Created:`, `${moment.utc(message.guild.createdAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`);

            if (message.guild.banner) {

                embed.setImage(message.guild.bannerURL({ format: 'png', dynamic: true, size: 1024 }));
            }

        message.channel.send(embed);
    }
}
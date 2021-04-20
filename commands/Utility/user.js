const Discord = require("discord.js");
const moment = require("moment");
const system = require('../../system.js');

module.exports = {
    name: 'user',
    usage: `${system.config.Prefix}`+"userinfo [User]",
    description: "Check your or a server member's stats for Discord.",
    execute(client, message) {

        let member = message.mentions.users.first() || message.author;
        let rMember = message.guild.member(message.mentions.users.first() || message.author)
        const roleMember = message.guild.member(member);

        let embed = new Discord.MessageEmbed()
            .setAuthor(member.tag, member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(message.guild.member(member).displayHexColor)
            .setThumbnail(member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .addField("Name", member.username, true)
            .addField("Nickname", message.guild.member(member).nickname ? message.guild.member(member).nickname : "None", true)
            .addField("ID", member.id)
            .addField("Color Hex", message.guild.member(member).displayHexColor)
            .addField(`Roles [${roleMember.roles.cache.size}]:`, roleMember.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" | "))
            .addField(`Account Created:`, `${moment.utc(member.createdAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`)
            .addField(`Joined Server:`, `${moment.utc(rMember.joinedAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`);

        message.channel.send(embed);
    }
}
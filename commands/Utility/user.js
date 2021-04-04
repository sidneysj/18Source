const Discord = require("discord.js");
const moment = require("moment");
const system = require('../../system.js');

module.exports = {
    name: 'user',
    usage: `${system.config.Prefix}`+"userinfo [@User]",
    description: "Check your or a server member's stats for Discord.",
    coolDown: 5,
    execute(client, message) {

        let member = message.mentions.users.first() || message.author;
        let rMember = message.guild.member(message.mentions.users.first() || message.author)
        const roleMember = message.guild.member(member);

        let embed = new Discord.MessageEmbed()
            .setAuthor(member.username, member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setColor(message.guild.member(member).displayHexColor)
            .setThumbnail(member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
            .setTimestamp(new Date)
            .addField("Name", member.username, true)
            .addField("Nickname", message.guild.member(member).nickname ? message.guild.member(member).nickname : "None", true)
            .addField("ID", member.id)
            .addField(`Roles [${roleMember.roles.cache.size}]:`, roleMember.roles.cache.map(s => s).join(" | "))
            .addField(`Account Created:`, `${moment.utc(member.createdAt).format('h:mm:ssa, (dddd) MMMM Do, YYYY')}`)
            .addField(`Joined Server:`, `${moment.utc(rMember.joinedAt).format('h:mm:ssa, (dddd) MMMM Do, YYYY')}`);

        message.channel.send(embed);
    }
}
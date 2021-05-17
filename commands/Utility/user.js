const Discord = require("discord.js");
const moment = require("moment");
const system = require('../../system.js');

module.exports = {
    name: 'user',
    aliases: ['userinfo'],
    usage: `${system.config.Prefix}` + "userinfo [@User] or [UserID]",
    description: "Check your or a server member's stats for Discord.",
    execute(client, message, args) {

        async function userData(item) {

            let member;
            let embed = new Discord.MessageEmbed()

            if (item && !message.mentions.users.size) {

                let searchGuild = await client.guilds.cache.get(item);
                if (searchGuild) return;

                let user = await message.guild.members.cache.find(member => member.id === item);
                if (!user) return;

                member = await message.guild.members.fetch(item);

                let rMember = message.guild.member(member)
                const roleMember = message.guild.member(member);

                embed.setAuthor(member.user.tag, member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                embed.setColor(member.displayHexColor)
                embed.setThumbnail(member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                embed.setTimestamp(new Date)
                embed.addField("Name", member.user.username, true)
                embed.addField("Nickname", member.user.nickname ? member.user.nickname : "None", true)
                embed.addField("ID", member.user.id)
                embed.addField("Color Hex", member.displayHexColor)
                embed.addField(`Roles [${roleMember.roles.cache.size}]:`, roleMember.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" | "))
                embed.addField(`Account Created:`, `${moment.utc(member.user.createdAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`)
                embed.addField(`Joined Server:`, `${moment.utc(member.joinedAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`);

            } else {

                member = message.mentions.users.first() || message.author;
                let rMember = message.guild.member(member)
                const roleMember = message.guild.member(member);

                embed.setAuthor(member.tag, member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                embed.setColor(rMember.displayHexColor)
                embed.setThumbnail(member.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                embed.setTimestamp(new Date)
                embed.addField("Name", member.username, true)
                embed.addField("Nickname", rMember.nickname ? rMember.nickname : "None", true)
                embed.addField("ID", member.id)
                embed.addField("Color Hex", rMember.displayHexColor)
                embed.addField(`Roles [${roleMember.roles.cache.size}]:`, roleMember.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" | "))
                embed.addField(`Account Created:`, `${moment.utc(member.createdAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`)
                embed.addField(`Joined Server:`, `${moment.utc(rMember.joinedAt).format('dddd | MMMM Do, YYYY @ hh:mm:ssa')}`);
            }

            message.channel.send(embed);
        }

        userData(args[0]);
    }
}
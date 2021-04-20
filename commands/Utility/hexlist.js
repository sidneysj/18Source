const system = require('../../system.js');
const Pagination = require('discord-paginationembed');

const Profile = require("../../models/guild.js");

module.exports = {
    name: 'hexlist',
    description: `View hexcodes you have inputted in the past. Input ${system.config.Prefix}hexlist delete <Placement> to delete a specific hex code on the list or input ${system.config.Prefix}hexlist clear to delete all hex codes on the list.`,
    execute(client, message, args) {

        Profile.findOne({
            UserID: message.author.id,
            ServerID: message.guild.id
        }, (err, profile) => {

            if (err) console.error(err);
            if (!profile) return;

            let tag = args.join("").toString().toLowerCase();
            let number = parseInt(args.splice(-1).join(""));
            if (number) tag = tag.slice(0, -number.toString().length);

            if (tag === "delete") {

                if (isNaN(number) || profile.ServerData.colorArray.length < number) return message.channel.send(`You must input the number of that color's placement you want to remove from the list.\n**Example**: ${system.config.Prefix}hexlist delete 1`);

                let deletedHex = profile.ServerData.colorArray[number - 1];
                let item = profile.ServerData.colorArray;
                item.splice(number - 1, 1);

                profile.save().catch(err => console.error(err));
                message.channel.send(`Successfully removed **${deletedHex}** from the list.`);
                console.log('\x1b[34m', `[${client.user.username}] Removed ${deletedHex} from ${message.author.username}'s database.`, '\x1b[0m');
            }

            if (tag === "clear") {

                let amount = profile.ServerData.colorArray.length;
                for (i = 0; i < profile.ServerData.colorArray.length; i++) {

                    var newObj = profile.ServerData.colorArray;
                    newObj.splice(i, 1);
                    i--;
                }

                profile.save().catch(err => console.error(err));
                message.channel.send(`Successfully removed all previous hex codes from the list.`);
                console.log('\x1b[34m', `[${client.user.username}] Removed ${amount} hex code(s) from ${message.author.username}'s database.`, '\x1b[0m');
            }

            if (!tag) {

                let items = profile.ServerData.colorArray;
                let embeds = [];

                if (items.length === 0) {

                    embeds.push(new Object({ words: "You have no saved hex codes!" }));

                } else {

                    for (i = 0; i < items.length; i++) {

                        embeds.push(new Object({ words: `**#${i + 1}** - **${items[i]}**` }));
                    }
                }

                const FieldsEmbed = new Pagination.FieldsEmbed()
                    .setArray(embeds)
                    .setAuthorizedUsers([message.author.id])
                    .setChannel(message.channel)
                    .setElementsPerPage(7)
                    .setPageIndicator(true)
                    .setDisabledNavigationEmojis(['delete'])
                    .formatField(` ‍ `, el => el.words);

                FieldsEmbed.embed
                    .setAuthor(message.author.username, message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                    .setColor(message.guild.member(message.author).displayHexColor)
                    .setDescription(`A total of **${items.length}** different color(s)!\nInput ${system.config.Prefix}**hexlist delete <Placecment>** to remove a hex code from the list.\nInput **${system.config.Prefix}hexlist clear** to delete all hex codes from the list.`)
                    .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))

                FieldsEmbed.build();
            }
        })

    }
}
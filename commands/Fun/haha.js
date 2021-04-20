const Discord = require("discord.js");
const system = require('../../system.js');

module.exports = {
    name: 'haha',
    usage: `${system.config.Prefix}` + "haha <User>",
    description: "The bot will send a message saying that a user's joke was funny.",
    execute(client, message) {

        let targetMember = message.mentions.members.first();

        if (!targetMember || targetMember.bot) {

            message.channel.send("Your joke was funny!");
            
        } else {

            message.channel.send(`<@${targetMember.id}>, Your joke was funny!`);
        }
    }
}
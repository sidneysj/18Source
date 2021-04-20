const Discord = require("discord.js");
const system = require('../../system.js');

module.exports = {
    name: 'boo',
    usage: `${system.config.Prefix}` + "boo <User>",
    description: "The bot will send a message saying that a user's joke sucks.",
    execute(client, message) {

        let targetMember = message.mentions.members.first();

        if (!targetMember || targetMember.bot) {

            message.channel.send("Your joke sucks!");

        } else {
            
            message.channel.send(`<@${targetMember.id}>, Your joke sucks!`);
        }
    }
}
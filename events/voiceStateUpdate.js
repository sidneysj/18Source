const Discord = require("discord.js");

const Server = require("../models/guildServer.js");

module.exports = (oldState, newState) => {

    Server.findOne({
        ServerID: newState.guild.id
    }, (err, sys) => {

        if (err) console.error(err);
        if (!sys) return;

        if (newState.member.bot) return;
        if (sys.ServerChannels.vcChatPublicChannel !== undefined) {

            if (newState.member.voice.channelID !== null) {

                let channel = oldState.channels.cache.find(r => r.id === sys.ServerChannels.vcChatPublicChannel)
                channel.updateOverwrite(newState.member.id, {
                    'VIEW_CHANNEL': true,
                })

            } else if (newState.member.voice.channelID === null) {

                let channel = oldState.channels.cache.find(r => r.id === sys.ServerChannels.vcChatPublicChannel)
                channel.updateOverwrite(newState.member.id, {
                    'VIEW_CHANNEL': false,
                })

            }  
        }
    })
}
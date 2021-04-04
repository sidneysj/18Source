const Discord = require("discord.js");
const system = require('../../system.js');

const Profile = require("../../models/guild.js");
const oldProfile = require("../../models/old/profile.js");

module.exports = {
    name: 'dgtransfer',
    coolDown: 60,
    description: "Transfer data from the old Guild model to the new one.",
    accessType: "DEVELOPER",
    execute(client, message) {

        message.channel.send("There's no need to use this command at the moment sir.");

        // message.channel.send("Updating models... Check your console for more information.");
        // var subArray = [];

        // oldProfile.find({
        // }, (err, oldProfile) => {

        //     if (err) console.error(err);
        //     for (i = 0; i < oldProfile.length; i++) {

        //         subArray.push(oldProfile[i]);
        //     }

        //     for (i = 0; i < subArray.length; i++) {

        //         const newProfile = new Profile({
        //             UserID: subArray[i].UserID,
        //             Username: subArray[i].Username,
        //             ServerID: subArray[i].ServerID,
        //             ServerData: {
        //                 messagesSent: 0,
        //                 activeColor: subArray[i].ActiveColor,
        //             }
        //         })

        //         newProfile.save().catch(err => console.error(err));
        //         console.log('\x1b[33m', `[18] Updated ${subArray[i].Username}'s data from the old model to the new one.`, '\x1b[0m');
        //     }

        //     console.log('\x1b[33m', `[18] Task completed.`, '\x1b[0m');
        // })
    }
}
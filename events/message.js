const Discord = require("discord.js");

const system = require('../system.js');
const mongoose = require("mongoose");

const Profile = require("../models/guild.js");

module.exports = (client, message) => {

    if (message.author.bot) return;

    mongoose.connect(client.config.Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Profile.findOne({
    //     UserID: message.author.id,
    //     ServerID: message.guild.id
    // }, (err, profile) => {

    //     if (err) console.error(err);
    //     if (!profile) {

    //         const newProfile = new Profile({
    //             UserID: message.author.id,
    //             Username: message.author.username,
    //             ServerID: message.guild.id,
    //             ServerData: {
    //                 messagePoints: 1,
    //             },
    //         })

    //         newProfile.save().catch(err => console.error(err));
    //         console.log('\x1b[34m', `[${client.user.username}] Created a new database for ${message.author.username} in ${message.guild.name}.`, '\x1b[0m');

    //     } else {

    //         Make sure to edit this portion when you come back to it!
    //         const now = Date.now();
    //         const timestamps = coolDowns.get(command.name);
    //         const coolDownAmount = (command.coolDown || 0) * 1000;

    //         if (timestamps.has(message.author.id)) {
    //             const expirationTime = timestamps.get(message.author.id) + coolDownAmount;

    //             if (now < expirationTime) {
    //                 const timeLeft = (expirationTime - now) / 1000;
    //                 return message.reply(`please wait **${timeLeft.toFixed(0)}** more second(s) before reusing the \`${command.name}\` command.`);
    //             }
    //         }

    //         profile.ServerData.messageSent++;

    //         if (profile.Username !== message.author.username) {

    //             profile.Username = message.author.username;
    //         }

    //         profile.save().catch(err => console.error(err));
    //     }
    // })
    if (message.content.indexOf(client.config.Prefix) !== 0) return;
    
    const args = message.content.slice(client.config.Prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (!command.guildOnly && message.channel.type === 'dm') {
        return;
    }

    if (command.accessType && message.author.id !== '239415387198849034') {
        return;
    }

    const { coolDowns } = client;

    if (!coolDowns.has(command.name)) {
        coolDowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = coolDowns.get(command.name);
    const coolDownAmount = (command.coolDown || 0) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + coolDownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait **${timeLeft.toFixed(0)}** more second(s) before reusing the \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), coolDownAmount);

    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);

        if (!authorPerms || !authorPerms.has(command.permissions)) {
            return;
        }
    }

    try {
        command.execute(client, message, args);
    } catch (e) {
        return system.imperfectRun(client, message, e, `${command.name}.js`, command.name);
    }
}
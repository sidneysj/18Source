const Discord = require("discord.js");

function imperfectRun(client, message, e, scriptName, commandName) {

	console.error('\x1b[31m', `${scriptName} has ran into an error:`, e);
	client.users.cache.get("239415387198849034").send(`Looks like I ran into an error while performing the command, **${scriptName}**` + " ```js\n" + e.stack + "\n```");
	message.channel.send(`:x:  |  An error occurred! Please try again later.`);
	
}

const config = require('./config.json'); 

const LatestVersion = "0.4.1";
const LatestUpdate = "**June 7, 2021** @ 12:52pm EST";

module.exports = { imperfectRun, config, LatestUpdate, LatestVersion}
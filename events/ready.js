const system = require('../system.js');

module.exports = (client) => {

    client.user.setActivity(`on v${system.LatestVersion}. Type ;help for assistants.`, { type: "PLAYING" });
    console.log('\x1b[35m', `[${client.user.username}] Ready to serve in the Duct Tape Discord server on version: ${system.LatestVersion}!`, '\x1b[0m');

    // setInterval(() => {
        
    // }, 1000);
}
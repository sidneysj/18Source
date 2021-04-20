const mongoose = require("mongoose");
const system = require('../system.js');

const Main = require('../models/main.js');
const Profile = require('../models/guild.js');

module.exports = (client) => {

    mongoose.connect(client.config.Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    var startUpRainbow = "No";

    Main.findOne({
        CurrentBuild: system.LatestVersion
    }, (err, main) => {

        if (err) console.error(err);
        if (!main) {

            console.log('\x1b[34m', `[${client.user.username}] A new version was found! Updating to Version ${system.LatestVersion}`, '\x1b[0m');
            const newMain = new Main({
                CurrentBuild: system.LatestVersion
            })

            newMain.save().catch(err => console.error(err)).then(() => {
                console.log('\x1b[34m', `[${client.user.username}] Created a new Main model! Make sure to delete any previous models to save space.`, '\x1b[0m');
            });
        }
    }).then(() => {
        client.user.setActivity(`on v${system.LatestVersion}. Type ;help for assistants.`, { type: "PLAYING" });
        console.log('\x1b[35m', `[${client.user.username}] Ready to serve in the Duct Tape Discord server on version: ${system.LatestVersion}!`, '\x1b[0m');
    })

    setInterval(() => {

        let colorChangeArray = [];

        Profile.find({
        }, (err, profile) => {

            if (err) console.error(err);
            for (i = 0; i < profile.length; i++) {

                if (profile[i].LocalSettings.allowRainbowEffect === "true" && profile[i].ServerData.colorArray.length > 1 && profile[i].ServerData.activeColor !== "None") {
                    colorChangeArray.push(profile[i]);
                }
            }

            for (i = 0; i < colorChangeArray.length; i++) {

                let userData = colorChangeArray[i];
                let guild = client.guilds.cache.get(userData.ServerID)
                let role = guild.roles.cache.find(r => r.id === userData.ServerData.activeColor);
                let currentHex = [];

                function shuffle(a) {
                    var j, x, i;
                    for (i = a.length - 1; i > 0; i--) {
                        j = Math.floor(Math.random() * (i + 1));
                        x = a[i];
                        a[i] = a[j];
                        a[j] = x;
                    }
                    return currentHex = a;
                }
                shuffle(userData.ServerData.colorArray)

                if (role.hexColor === currentHex[0]) {
                    role.edit({ name: currentHex[1], color: currentHex[1]})
                } else {
                    role.edit({ name: currentHex[0], color: currentHex[0]})
                }
            }
        })

        console.log('\x1b[34m', `[${client.user.username}] Successfully edited ${colorChangeArray.length} color roles.`, '\x1b[0m');
    }, 3.6e+6)
}
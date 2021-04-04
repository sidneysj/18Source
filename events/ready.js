const mongoose = require("mongoose");
const system = require('../system.js');

const Main = require('../models/main.js');

module.exports = (client) => {

    mongoose.connect(client.config.Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log('\x1b[33m', `[18] Checking for updates on the Main model...`, '\x1b[0m');

    Main.findOne({
        CurrentBuild: system.config.LatestVersion
    }, (err, main) => {

        if (err) console.error(err);
        if (!main) {

            const newMain = new Main({
                CurrentBuild: system.config.LatestVersion
            })

            newMain.save().catch(err => console.error(err));
            console.log('\x1b[33m', `[18] Created a new Main model! Make sure to delete any previous models to save space.`, '\x1b[0m');
        } else {
            console.log('\x1b[33m', `[18] No updates were found.`, '\x1b[0m');
        }
    })

    client.user.setActivity(`on v${system.config.LatestVersion}. Type ;help for assistants.`, { type: "PLAYING" });
    console.log('\x1b[33m', `[18] Ready to serve in the Duct Tape Discord server on version: ${system.config.LatestVersion}!`, '\x1b[0m');
}
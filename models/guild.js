const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    UserID: String,
    Username: String,
    ServerID: String,
    ServerData: {
        messagePoints: {type: Number, default: 0},
        activeColor: String,
        colorArray: []
    },
    LocalSettings : {
        allowRainbowEffect: {type: String, default: "false"},
        allowAutoSaveHex: {type: String, default: "true"}
    }

});

module.exports = mongoose.model("Guild", guildSchema);
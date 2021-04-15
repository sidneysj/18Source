const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    UserID: String,
    Username: String,
    ServerID: String,
    ServerData: {
        activeColor: String,
        colorArray: []
    }

});

module.exports = mongoose.model("Guild", guildSchema);
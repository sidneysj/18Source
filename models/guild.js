const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    UserID: String,
    Username: String,
    ServerID: String,
    ServerData: {
        messagesSent: {type: Number, default: 1},
        activeColor: String,
    }

});

module.exports = mongoose.model("Guild", guildSchema);
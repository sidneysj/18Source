const mongoose = require("mongoose");

const guildUserSchema = mongoose.Schema({
    UserID: String,
    Username: String,
    ServerID: String,
    ServerData: {
        activeColor: String,
    },

});

module.exports = mongoose.model("GuildUser", guildUserSchema);
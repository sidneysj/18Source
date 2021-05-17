const mongoose = require("mongoose");

const guildServerSchema = mongoose.Schema({
    ServerName: String,
    ServerID: String,
    ServerFeatures: {
        allowColorRoles: {type: String, default: "false"},
    },
    ServerChannels: {
        modLogChannel: String,
        vcChatPublicChannel: String,
        vcChatPrivateChannel: String,
        saveImageChannels: [],
    },
    ModerationLogs: {
        logBans: {type: String, default: "false"},
        logVCs: {
            joined: {type: String, default: "false"},
            left: {type: String, default: "false"},
        },
        logUser: {
            joined: {type: String, default: "false"},
            left: {type: String, default: "false"},
            changedName: {type: String, default: "false"},
            message: {type: String, default: "false"},
        }
    }

});

module.exports = mongoose.model("GuildServer", guildServerSchema);
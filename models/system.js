const mongoose = require("mongoose");

const systemSchema = mongoose.Schema({
    Servername: String,
    ServerID: String,
    BotRoleID: String,
    ServerFeatures: {
        allowColorRoles: {type: String, default: "false"},
        allowModeration: {type: String, default: "false"},
        allowStackRole: {type: String, default: "false"},
        allowJoinMessage: {type: String, default: "false"},
        allowLeaveMessage: {type: String, default: "false"},
        allowMessagePoints: {type: String, default: "false"},
        customJoinMessage: [],
        customLeaveMessage: [],
        levelRoles: [],
    },
    ServerChannels: {
        modLogChannel: String,
        userLogChannel: String,
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

module.exports = mongoose.model("System", systemSchema);
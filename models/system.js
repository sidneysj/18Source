const mongoose = require("mongoose");

const systemSchema = mongoose.Schema({
    Servername: String,
    ServerID: String,
    ServerFeatures: {
        allowColorRoles: {type: String, default: false},
        allowModeration: {type: String, default: false},
        allowStackRole: {type: String, default: false},
        allowJoinMessage: {type: String, default: false},
        allowLeaveMessage: {type: String, default: false},
        customJoinMessage: {type: String, default: ""},
        customLeaveMessage: {type: String, default: ""},
        levelRoles: [],
    },
    ServerChannels: {
        modChannel: String,
        userChannel: String,
    },
    ModerationLogs: {
        logBans: {type: String, default: false},
        logVCs: {
            joined: {type: String, default: false},
            left: {type: String, default: false},
        },
        logUser: {
            joined: {type: String, default: false},
            left: {type: String, default: false},
            changedName: {type: String, default: false},
            message: {type: String, default: false},
        }
    }

});

module.exports = mongoose.model("System", systemSchema);
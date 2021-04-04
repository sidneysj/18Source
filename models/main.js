const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
    CurrentBuild: {type: String, default: "0.2.0"},
    DeveloperID: {type: Number, default: 239415387198849034},
    UpdateInProgress: {type: String, default: false},
    MaintenanceMode: {type: String, default: false},
    DisableCommands: []
});

module.exports = mongoose.model("Main", mainSchema);
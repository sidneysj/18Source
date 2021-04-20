const mongoose = require("mongoose");

const mainSchema = mongoose.Schema({
    CurrentBuild: String,
    UpdateInProgress: {type: String, default: false},
    MaintenanceMode: {type: String, default: false},
    DisableCommands: []
});

module.exports = mongoose.model("Main", mainSchema);
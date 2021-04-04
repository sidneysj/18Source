const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
    UserID: String,
    Username: String,
    Credits: {
        amount: {type: Number, default: 0},
        overall: {type: Number, default: 0},
        spent: {type: Number, default: 0},
        coolDown: Number,
    },
});

module.exports = mongoose.model("Guild", guildSchema);
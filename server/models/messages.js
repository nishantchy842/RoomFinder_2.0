const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
    { dbUserId: String, message: String },
    { timestamps: true }
);

const Messages = mongoose.model("Messages", messagesSchema);

module.exports = Messages;
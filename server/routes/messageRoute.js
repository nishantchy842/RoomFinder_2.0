const { Router } = require("express");
const app = Router();
const messageController = require("../controllers/messageController");

app.post("/messages", messageController.SendMessage);

module.exports = app;
const express = require("express");
const router = express.Router();
const Messages = require("../models/messages");

// RECEIVE MESSAGES FROM THE FRONTEND

const SendMessage = async (req, res) => {
  try {
    const data = await Messages.create(req.body);
    if (data) {
      console.log(data);
      res.status(200).json({ msgToDev: "Message received by the server." });
    }
  } catch (e) {
    console.log(e);
  }
};

exports.SendMessage = SendMessage;
const express = require('express');

const router = express.Router();

const MessagesController = require('../controllers/messages');

const authHelper = require('../helpers/authHelper');

router.post('/chat-messages/:senderId/:receiverId', authHelper.verifyToken, MessagesController.sendMessage);

module.exports = router;

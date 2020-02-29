const express = require('express');

const router = express.Router();

const MessagesController = require('../controllers/messages');

const authHelper = require('../helpers/authHelper');

router.get('/chat-messages/:sender_Id/:receiver_Id', authHelper.verifyToken, MessagesController.getAllMessages);

router.post('/chat-messages/:sender_Id/:receiver_Id', authHelper.verifyToken, MessagesController.sendMessage);

module.exports = router;

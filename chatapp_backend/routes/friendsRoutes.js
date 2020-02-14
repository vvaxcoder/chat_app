const express = require('express');

const router = express.Router();

const FriendsController = require('../controllers/friends');

const authHelper = require('../helpers/authHelper');

router.post('/follow-user', authHelper.verifyToken, FriendsController.followUser);

module.exports = router;

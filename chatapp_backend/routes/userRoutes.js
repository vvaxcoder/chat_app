const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users');

const authHelper = require('../helpers/authHelper');

router.get('/users', authHelper.verifyToken, UserController.getAllUsers);

module.exports = router;
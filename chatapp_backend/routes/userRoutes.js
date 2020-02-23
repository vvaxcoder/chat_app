const express = require('express');

const router = express.Router();

const UserController = require('../controllers/users');

const authHelper = require('../helpers/authHelper');

router.get('/users', authHelper.verifyToken, UserController.getAllUsers);

router.get('/users/:id', authHelper.verifyToken, UserController.getUserById);

router.get('/usersby/:username', authHelper.verifyToken, UserController.getUserByUsername);

module.exports = router;

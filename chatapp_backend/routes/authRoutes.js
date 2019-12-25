const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.post('/signup', AuthController.createUser);

module.exports = router;
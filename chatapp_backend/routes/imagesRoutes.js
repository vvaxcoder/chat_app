const express = require('express');

const router = express.Router();

const ImagesController = require('../controllers/images');

const authHelper = require('../helpers/authHelper');

router.post('/upload-image', authHelper.verifyToken, ImagesController.uploadImage);

module.exports = router;

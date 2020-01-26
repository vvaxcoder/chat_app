const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');
const authHelper = require('../helpers/authHelper');

router.post('/post/add-post', authHelper.verifyToken, PostsController.addPost);

module.exports = router;
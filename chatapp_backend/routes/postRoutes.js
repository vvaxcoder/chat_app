const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/posts');
const authHelper = require('../helpers/authHelper');

router.get('/posts', authHelper.verifyToken, PostsController.getAllPosts);

router.post('/post/add-post', authHelper.verifyToken, PostsController.addPost);

module.exports = router;
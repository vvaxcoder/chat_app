const User = require('../models/userModel');

const HttpStatus = require('http-status-codes');

module.exports = {
  async getAllUsers(req, resp) {
    await User.find({}).populate('posts.postId')
      .populate('following.userFollower')
      .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'All users', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  },
  async getUserById(req, resp) {
    await User.findOne({_id: req.params.id}).populate('posts.postId')
      .populate('following.userFollower')
      .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'Get user by id', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  },
  async getUserByUsername(req, resp) {
    await User.findOne({username: req.params.username}).populate('posts.postId')
      .populate('following.userFollower')
      .populate('followers.follower')
      .populate('chatList.receiverId')
      .populate('chatList.msgId')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'Get user by username', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  }
};

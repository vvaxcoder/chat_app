const User = require('../models/userModel');

const HttpStatus = require('http-status-codes');

module.exports = {
  async getAllUsers(req, resp) {
    await User.findMany({}).populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'All users', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  },
  async getUser(req, resp) {
    await User.findOne({_id: req.params.id}).populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'Get user by id', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  },
  async getUserByUsername(req, resp) {
    await User.findOne({username: req.params.username}).populate('posts.postId')
      .populate('following.userFollowed')
      .populate('followers.follower')
      .then(result => {
        resp.status(HttpStatus.OK).json({message: 'Get user by username', result})
      })
      .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occurred'}));
  }
};

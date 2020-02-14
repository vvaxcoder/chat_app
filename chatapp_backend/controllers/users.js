const User = require('../models/userModel');

const HttpStatus = require('http-status-codes');

module.exports = {
    async getAllUsers(req,resp) {
        await User.find({}).populate('posts.postId').then(result => {
            resp.status(HttpStatus.OK).json({ message: 'All users', result })})
            .catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' }));
    }
};

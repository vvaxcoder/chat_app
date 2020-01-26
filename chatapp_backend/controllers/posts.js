const Joi = require("@hapi/joi");
const HttpStatus = require("http-status-codes");

const Post = require("../models/postModel");

module.exports = {
  addPost(req, resp) {
    const schema = Joi.object({
      post: Joi.string().required()
    });

    const { post } = req.body;

    const { error } = schema.validate({ post });

    if (error && error.details) {
      return resp.status(HttpStatus.BAD_REQUEST).json({ msg: error.details });
    }

    const body = {
        user: req.user._id,
        username: req.user.username,
        post: req.user.post,
        created: new Date()
    };

    Post.create(body).then(post => {
        resp.status(HttpStatus.OK).json({ message: 'Post created', post });
    }).catch(err => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' });
    });
  }
};

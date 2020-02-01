const Joi = require("@hapi/joi");
const HttpStatus = require("http-status-codes");

const Post = require("../models/postModel");
const User = require("../models/userModel");

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

    Post.create(body)
      .then(async post => {
        await User.updateOne(
          { _id: req.user._id },
          { $push: { posts: { postId: post._id, post: req.body.post, created: new Date() } } }
        );

        resp.status(HttpStatus.OK).json({ message: "Post created", post });
      })
      .catch(err => {
        resp
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  }
};

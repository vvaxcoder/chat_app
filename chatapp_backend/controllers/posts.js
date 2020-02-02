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
      post: post,
      created: new Date()
    };

    Post.create(body)
      .then(async post => {
        await User.updateOne(
          { _id: req.user._id },
          {
            $push: {
              posts: {
                postId: post._id,
                post: req.body.post,
                created: new Date()
              }
            }
          }
        );

        resp.status(HttpStatus.OK).json({ message: "Post created", post });
      })
      .catch(err => {
        resp
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Error occured" });
      });
  },

  async getAllPosts(req, resp) {
    try {
      const posts = await Post.find({})
        .populate("user")
        .sort({ created: -1 });

      return resp.status(HttpStatus.OK).json({ message: "All posts", posts });
    } catch (error) {
      return resp
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error occured" });
    }
  },

  async addLike(req, resp) {
    const post_id = req.body._id;

    await Post.updateOne(
      { _id: post_id,
      'likes.username': { $ne: req.user.username } },
      {
        $push: {
          likes: {
            username: req.user.username
          }
        },
        $inc: {
          totalLike: 1
        }
      }
    ).then(() => {
      resp.status(HttpStatus.OK).json({ message: 'You liked the post' });
    }).catch(error => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' }));
  },

  async addComment(req, resp) {
    const post_id = req.body.postId;

    await Post.updateOne(
      { _id: post_id },
      {
        $push: {
          comments: {
            userId: req.user._id,
            username: req.user.username,
            comment: req.body.comment,
            createdAt: new Date()
          }
        }
      }
    ).then(() => {
      resp.status(HttpStatus.OK).json({ message: 'Comment added' });
    }).catch(error => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' }));
  },

  async getPost(req, resp) {
    await Post.findOne({ _id: req.params.id }).populate('user').populate('userId')
    .then(post => {
      resp.status(HttpStatus.OK).json({ message: 'Post found', post });
    })
    .catch(err => resp.status(HttpStatus.NOT_FOUND).json({ message: 'Post not found', post }));
  }
};

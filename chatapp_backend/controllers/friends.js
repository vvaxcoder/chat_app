const User = require("../models/userModel");

const HttpStatus = require("http-status-codes");

module.exports = {
  followUser(req, resp) {
    const followUser = async () => {
      await User.updateMany({
        _id: req.user._id,
        "following.userFollower": { $ne: req.body.userFollower } },
        { $push: {
          following: {
            userFollower: req.body.userFollower
          }
        }
      });

      await User.updateOne({
        _id: req.body.userFollower,
        "followers.follower": { $ne: req.user._id } },
        { $push: {
          followers: {
            follower: req.user._id
          }
        }
      });
    };

    followUser()
      .then(() => {
        resp.status(HttpStatus.OK).json({ message: 'Following user now' });
      })
      .catch(err => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured in followUser method' });
      });
  }
};

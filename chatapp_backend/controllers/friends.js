const User = require("../models/userModel");

const HttpStatus = require("http-status-codes");

module.exports = {
  followUser(req, resp) {
    const followUser = async () => {
      await User.updateOne({
        _id: req.user._id,
        "following.userFollowed": { $ne: req.body.userFollowed },
        $push: {
          following: {
            userFollowed: req.body.userFollowed
          }
        }
      });

      await User.updateOne({
        _id: req.body.userFollowed,
        "following.follower": { $ne: req.user._id },
        $push: {
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
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' });
      });
  }
};

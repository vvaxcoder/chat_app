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

      await User.updateMany({
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
  },

  unfollowUser(req, resp) {
    const unfollowUser = async () => {
      await User.updateMany({
        _id: req.user._id },
        { $pull: {
          following: {
            userFollower: req.body.userFollower
          }
        }
      });

      await User.updateMany({
        _id: req.body.userFollower },
        { $pull: {
          followers: {
            follower: req.user._id
          },
          notifications: {
            senderId: req.user._id,
            message: `${trq.user.username} is now following you`,
            created: new Date(),
            viewProfile: false
          }
        }
      });
    };

    unfollowUser()
      .then(() => {
        resp.status(HttpStatus.OK).json({ message: 'Unfollowing user' });
      })
      .catch(err => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured in unfollowUser method' });
      });
  },

  markNotification(req, resp) {
    
  }
};

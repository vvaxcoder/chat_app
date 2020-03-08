const User = require("../models/userModel");

const HttpStatus = require("http-status-codes");

module.exports = {
  followUser(req, resp) {
    const followUser = async () => {
      await User.update({
        _id: req.user._id,
        "following.userFollower": { $ne: req.body.userFollower } },
        { $push: {
          following: {
            userFollower: req.body.userFollower
          }
        }
      });

      await User.update({
        _id: req.body.userFollower,
        "followers.follower": { $ne: req.user._id } },
        { $push: {
          followers: {
            follower: req.user._id
          },
            notifications: {
            senderId: req.user._id,
              message: `${req.user.username} is now following you.`,
              created: new Date(),
              viewProfile: false
            }
        }
      });
    };

    followUser()
      .then(() => {
        resp.status(HttpStatus.OK).json({ message: 'Following user now' });
      })
      .catch(err => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in followUser method' });
      });
  },

  unfollowUser(req, resp) {
    const unfollowUser = async () => {
      await User.update({
        _id: req.user._id },
        { $pull: {
          following: {
            userFollower: req.body.userFollower
          }
        }
      });

      await User.update({
        _id: req.body.userFollower },
        { $pull: {
          followers: {
            follower: req.user._id
          },
          notifications: {
            senderId: req.user._id,
            message: `${req.user.username} is now following you`,
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
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in unfollowUser method' });
      });
  },

  async markNotification(req, resp) {
    if(!req.body.isDelete) {
      await User.updateOne({
        _id: req.user._id,
        'notifications._id': req.params.id
      }, {
        $set: {
          'notifications.$.read': true
        }
      }).then(() => {
        resp.status(HttpStatus.OK).json({ message: 'Marked as read' });
      }).catch(error => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in markNoification' });
      });
    }
    else {
      await User.update({
        _id : req.user._id,
        'notifications._id': req.params.id
      },
      {
        $pull: {
          notifications: {
            _id: req.params.id
          }
        }
      })
      .then(() => {
        resp.status(HttpStatus.OK).json({ message: 'Deleted successfully' });
      }).catch(error => {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in markNoification' });
      });
    }
  },

  async markAllNotifications(req, resp) {
    await User.update({
      _id: req.user._id
    }, {
      $set: {
        'notifications.$[elem].read': true
      }
    }, {
      arrayFilters: [{ 'elem.read': false }], multi: true
    })
    .then(() => {
      resp.status(HttpStatus.OK).json({ message: 'Marked all successfully' });
    }).catch(error => {
      resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in markAllNoifications' });
    });
  }
};

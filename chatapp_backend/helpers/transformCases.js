const User = require('../models/userModel');

module.exports = {
  firstLetterUppercase: username => {
    const name = username.toLowerCase();

    return name.charAt(0).toUpperCase() + name.slice(1);
  },

  firstLetterLowercase: str => {
    return str.toLowerCase();
  },

  updateChatList: async (req, message) =>  {
    await User.update(
      {
        _id: req.user._id
      },
      {
        $push: {
          chatList: {
            $each: [
              {
                receiverId: req.params.receiver_Id,
                msgId: message._id
              }
            ],
            $position: 0
          }
        }
      }
    );

    await User.update(
      {
        _id: req.params.receiver_Id
      },
      {
        $push: {
          chatList: {
            $each: [
              {
                receiverId: req.user._id,
                msgId: message._id
              }
            ],
            $position: 0
          }
        }
      }
    );
  }
}

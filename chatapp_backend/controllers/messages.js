const HttpStatus = require("http-status-codes");

const Message = require("../models/messageModel");
const Conversation = require("../models/conversationModel");
const User = require("../models/userModel");
const helpers = require("../helpers/transformCases");

module.exports = {
  async getAllMessages(req, resp) {
    const {sender_Id, receiver_Id} = req.params;

    const conversation = await Conversation.findOne({
      $or: [
        {
          $and: [
            {
              'participants.senderId': sender_Id
            },
            {
              'participants.receiverId': receiver_Id
            }
          ],
        },
        {
          $and: [
            {
              'participants.senderId': receiver_Id
            },
            {
              'participants.receiverId': sender_Id
            }
          ]
        }
      ]
    })
      .select('_id');


    if (conversation) {
      const messages = await Message.findOne({conversationId: conversation._id});

      resp.status(HttpStatus.OK).json({message: "Messages returned", messages});
    }
  },

  async sendMessage(req, resp) {
    const {sender_Id, receiver_Id} = req.params;

    Conversation.find(
      {
        $or: [
          {
            participants: {
              $elemMatch: {senderId: sender_Id, receiverId: receiver_Id}
            }
          },
          {
            participants: {
              $elemMatch: {senderId: receiver_Id, receiverId: sender_Id}
            }
          }
        ]
      },
      async (err, result) => {
        const msg = await Message.findOne({
          conversationId: result[0]._id
        });

        helpers.updateChatList(req, msg);

        if (result.length > 0) {
          await Message.updateOne({
            conversationId: result[0]._id
          }, {
            $push: {
              message: {
                senderId: req.user._id,
                receiverId: req.params.receiver_Id,
                senderName: req.user.username,
                receiverName: req.body.receiverName,
                body: req.body.message
              }
            }
          })
            .then(() =>
              resp.status(HttpStatus.OK).json({message: "Message sent successfully"})
            )
            .catch(err =>
              resp
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: "Error occure when message sent"})
            );
        }
        /**
         * conversation just have been started between users, messages collection isn't presented yet
         */
        else {
          const newConversation = new Conversation();

          newConversation.participants.push({
            senderId: req.user._id,
            receiverId: req.params.receiver_Id
          });

          const saveConversation = await newConversation.save();

          const newMessage = new Message();

          newMessage.conversationId = saveConversation._id;

          newMessage.sender = req.user.username;

          newMessage.receiver = req.body.receiverName;

          newMessage.message.push({
            senderId: req.user._id,
            receiverId: req.params.receiver_Id,
            senderName: req.user.username,
            receiverName: req.body.receiverName,
            body: req.body.message
          });

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
                      msgId: newMessage._id
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
                      msgId: newMessage._id
                    }
                  ],
                  $position: 0
                }
              }
            }
          );

          await newMessage
            .save()
            .then(() =>
              resp.status(HttpStatus.OK).json({message: "Message sent"})
            )
            .catch(err =>
              resp
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({message: "Error occure when message sent"})
            );
        }
      }
    );
  },

  async markReceiverMessages(req, resp) {
    const {sender, receiver} = req.params;

    const msg = await Message.aggregate([
      {$unwind: '$message'},
      {
        $match: {
          $and: [
            {
              'message.senderName': receiver,
              'message.receiverName': sender
            }
          ]
        }
      }
    ]);

    if (msg.length > 0) {
      try {
        msg.forEach(async item => {
          await Message.updateOne({
            'message._id': value.message._id
          },
            {
              $set: {
                'message.$.isRead': true
              }
            });
        });

        resp.status(HttpStatus.OK).json({ message: 'Messages marked in markReceiverMessages' });
      }
      catch (err) {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in markReceiverMessages' });
      }
    }
  },

  async markAllMessages(req, resp) {
    const msg = await Message.aggregate([
      {
        $match: {
          'receiverName': req.user.username
        }
      },
      {
        $unwind: '$message'},
      {
        $match: {
          'receiverName': req.user.username
        }
      }
    ]);

    if (msg.length > 0) {
      try {
        msg.forEach(async item => {
          await Message.updateOne({
            'message._id': value.message._id
          },
            {
              $set: {
                'message.$.isRead': true
              }
            });
        });

        resp.status(HttpStatus.OK).json({ message: 'All messages marked in markReceiverMessages' });
      }
      catch (err) {
        resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred in markAllMessages' });
      }
    }
  }
};

const User = require("../models/userModel");

const cloudinary = require('cloudinary').v2;

const HttpStatus = require("http-status-codes");

const { cloudinary_name, cloudinary_api_key, cloudinary_api_secret } = require("../config");

cloudinary.config({
  cloud_name: cloudinary_name,
  api_key: cloudinary_api_key,
  api_secret: cloudinary_api_secret
});

module.exports = {
  async uploadImage(req, resp) {
    cloudinary.uploader.upload(req.body.image, async (error, result) => {
      await User.updateOne({
        _id: req.user._id
      },
      {
        $push: {
          images: {
            imgId: result.public_id,
            imgVersion: result.version,
          }
        }
      })
      .then(() => resp.status(HttpStatus.OK).json({ message: 'Image upload successfully' }))
    .catch(() => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred when image upload' }));

  });
  },

  async setDefaultImage(req, resp) {
    const { imgId, imgVersion } = req.params;
    
    await User.updateOne({
      _id: req.user._id
    },
    {
      picId: imgId,
      picVersion: imgVersion
    })
    .then(() => resp.status(HttpStatus.OK).json({ message: 'Default image set' }))
  .catch(() => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occurred when default image set' }));
  }
};

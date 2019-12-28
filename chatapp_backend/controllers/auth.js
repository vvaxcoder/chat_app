const Joi = require("@hapi/joi");
const HttpStatus = require('http-status-codes');
const User = require("../models/userModel");
const transformCases = require("../helpers/transformCases");
const bcrypt = require("bcryptjs");

module.exports = {
  async createUser(req, resp) {
    const schema = Joi.object({
      username: Joi.string()
        .alphanum()
        .min(5)
        .max(15)
        .required(),
      email: Joi.string().email(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
    });

    const {username, email, password} = req.body;

    const {error, value} = schema.validate({username, email, password});

    if (error && error.details) {
      return resp.status(HttpStatus.BAD_REQUEST).json({message: error.details});
    }

    const userEmail = await User.findOne({email: transformCases.firstLetterLowercase(value.email)});

    if (userEmail) {
      return resp.status(HttpStatus.CONFLICT).json({message: 'Email already exists!'});
    }

    const userName = await User.findOne({username: transformCases.firstLetterUppercase(value.username)});

    if (userName) {
      return resp.status(HttpStatus.CONFLICT).json({message: 'userName already exists!'});
    }

    return bcrypt.hash(value.password, 12, (err, hash) => {
      if (error) {
        return resp.status(HttpStatus.BAD_REQUEST).json({message: 'Error hashing password'});
      }

      const body = {
        username: transformCases.firstLetterUppercase(value.username),
        email: transformCases.firstLetterUppercase(value.email),
        password: hash
      };

      User.create(body).then(user => resp.status(HttpStatus.CREATED).json({
        message: "User created successfully",
        user
      })).catch(err => resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: 'Error occured'}));
    });
  }
};

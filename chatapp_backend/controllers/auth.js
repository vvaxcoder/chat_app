const Joi = require("@hapi/joi");
const HttpStatus = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const transformCases = require("../helpers/transformCases");
const { secret } = require('../config');

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

    const { username, email, password } = req.body;

    const { error, value } = schema.validate({ username, email, password });

    if (error && error.details) {
      return resp
        .status(HttpStatus.BAD_REQUEST)
        .json({ msg: error.details });
    }

    const userEmail = await User.findOne({
      email: transformCases.firstLetterLowercase(value.email)
    });

    if (userEmail) {
      return resp
        .status(HttpStatus.CONFLICT)
        .json({ message: "Email already exists!" });
    }

    const userName = await User.findOne({
      username: transformCases.firstLetterUppercase(value.username)
    });

    if (userName) {
      return resp
        .status(HttpStatus.CONFLICT)
        .json({ message: "userName already exists!" });
    }

    return bcrypt.hash(value.password, 12, (err, hash) => {
      if (error) {
        return resp
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Error hashing password" });
      }

      const body = {
        username: transformCases.firstLetterUppercase(value.username),
        email: transformCases.firstLetterUppercase(value.email),
        password: hash
      };

      User.create(body)
        .then(user => {
          const token = jwt.sign({ user }, secret, {
            expiresIn: '2h'
          });

          resp.cookie('auth', token);

          resp.status(HttpStatus.CREATED).json({
            message: "User created successfully",
            user,
            token
          });
        })

        .catch(err =>
          resp
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({ message: "Error occured" })
        );
    });
  },

  async loginUser(req, resp) {
    if (!req.body.username|| !req.body.password) {
      return resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'No empty fields allowed' });
    }

    const { username } = req.body;

    await User.findOne({ username: transformCases.firstLetterUppercase(username) }).then(user => {
      if (!user) {
        return resp.status(HttpStatus.NOT_FOUND).json({ message: 'Username not found' });
      }

      return bcrypt.compare(req.body.password, user.password).then(result => {
        if (!result) {
          return resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Password is incorrect' });
        }

        const token = jwt.sign({ data: user }, secret, { expiresIn: '1h' });

        resp.cookie('auth', token);

        return resp.status(HttpStatus.OK).json({ message: 'Login successful', user, token });
      })
    })
    .catch(err => {
      return resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error occured' });
    })
  }
};

const Joi = require("@hapi/joi");
const HttpStatus = require('http-status-codes')

module.exports = {
  createUser(req, resp) {
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
          return resp.status(HttpStatus.BAD_REQUEST).json({ message: error.details });
      }
  }
};

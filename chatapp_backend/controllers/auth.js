const Joi = require("@hapi/joi");

module.exports = {
  createUser(req, resp) {
    const schema = Joi.object()
      .keys({
        username: Joi.string()
          .alphanum()
          .min(5)
          .max(15)
          .required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/)
      })
      .with("username", "birthyear")
      .without("password", "access_token");

      const { error, value } = Joi.ValidationError(req.body, schema);

      if (error && error.details) {
          return resp.status(500).json({ message: error.details });
      }
  }
};

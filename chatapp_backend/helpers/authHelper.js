const jwt = require("jsonwebtoken");
const dbConfig = require("../config");
const HttpStatus = require("http-status-codes");

module.exports = {
  verifyToken: (req, resp, next) => {
    const token = req.cookies.auth;

    if (!token) {
      return resp
        .status(HttpStatus.FORBIDDEN)
        .json({ message: "No token provided" });
    }

    return jwt.verify(token, dbConfig.secret, (err, decoded) => {
      if (err) {
        if (err.expiredAt < new Date()) {
          return resp
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
              message: "Token has expired. Please, logon again",
              token: null
            });
        }
        next();
      }

      req.user = decoded.data;

      next();
    });
  }
};

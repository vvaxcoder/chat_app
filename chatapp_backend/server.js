const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const config = require("./config");

const auth = require("./routes/authRoutes");

const app = express();

app.use(cookieParser());

app.use(logger("dev"));

app.use("/api/chatapp", auth);

mongoose.Promise = global.Promise;

mongoose.connect(config.bd_url, {
  useNewUrlParser: true
});

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`);
});

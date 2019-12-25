const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const { db_url, port } = require("./config");

const auth = require("./routes/authRoutes");

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(cookieParser());

app.use(logger("dev"));

mongoose.Promise = global.Promise;

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/chatapp", auth);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

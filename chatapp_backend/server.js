const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
// const logger = require("morgan");
const cors = require("cors");

const { db_url, port } = require("./config");

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

// app.use(logger("dev"));

mongoose.Promise = global.Promise;

mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());

app.use((req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Credentials", "true");
  resp.header(
    "Access-Control-Allow-Methods",
    "GET",
    "POST",
    "DELETE",
    "PUT",
    "OPTIONS"
  );
  resp.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const auth = require("./routes/authRoutes");

app.use("/api/chatapp", auth);

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

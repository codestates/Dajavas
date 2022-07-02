const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const mapRouter = require("./routes/map");
const rankingRouter = require("./routes/ranking");
const fishRouter = require("./routes/fish");
const https = require("https");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [
      "https://dajavas.net",
      "https://dajavas.net/",
      "http://dajavas.net",
      "http://dajavas.net/",
      "https://localhost:3000",
      "http://localhost:3000",
      "https://localhost:3000/",
      "http://localhost:3000/",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"],
  })
);

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/fish", fishRouter);
app.use("/map", mapRouter);
app.use("/ranking", rankingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const models = require("./models/index.js");

models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

const HTTPS_PORT = 80;

let server;
server = app.listen(HTTPS_PORT, () => {
  console.log("http server runnning");
});

module.exports = server;

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
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
  origin: 'https://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'OPTIONS', 'DELETE', 'PATCH']
}));

app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/fish", fishRouter);
app.use("/map", mapRouter);
app.use("/ranking", rankingRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// ----
const HTTPS_PORT = 5000 || 80;

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server runnning👊"));
} else {
  server = app.listen(HTTPS_PORT, () => {
    console.log("http server runnning");
  });
}
module.exports = server;
// module.exports = app;

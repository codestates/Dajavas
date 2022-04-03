const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user/mypage");
const emailcheck = require("../controllers/user/emailcheck");
const namecheck = require("../controllers/user/namecheck");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");
const signup = require("../controllers/user/signup");
const kakaoLogin = require("../controllers/user/kakaoLogin");
const googleLogin = require("../controllers/user/googleLogin");

/* GET users listing. */

router.get("/mypage", controllers.get);
router.get("/emailcheck", emailcheck.get);
router.get("/namecheck", namecheck.get);
router.post("/login", login.post);
router.post("/login/kakao", kakaoLogin.post);
router.post("/login/google", googleLogin.post);
router.post("/signup", signup.post);
router.post("/logout", logout.post);
router.patch("/mypage", controllers.patch);
router.delete("/mypage", controllers.delete);

module.exports = router;

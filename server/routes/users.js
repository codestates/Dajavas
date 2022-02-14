const express = require("express");
const router = express.Router();
const controllers = require("../controllers/user");

/* GET users listing. */
router.get("/mypage", controllers.mypage.get);
router.get("/emailcheck", controllers.emailcheck.get);
router.get("/namecheck", controllers.namecheck.get);
router.post("/login", controllers.login.post);
router.post("/signup", controllers.signup.post);
router.post("/logout", controllers.logout.post);
router.put("/mypage", controllers.mypage.put);
router.delete("/mypage", controllers.mypage.delete);

module.exports = router;

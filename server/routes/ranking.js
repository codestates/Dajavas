const express = require("express");
const router = express.Router();
const controllers = require("../controllers/ranking/ranking");

/* GET ranking listing. */
router.get("/", controllers.get);

module.exports = router;

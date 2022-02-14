const express = require("express");
const router = express.Router();
const controllers = require("../controllers/fish/board");

router.get("/", controllers.get);
router.post("/", controllers.post);
router.put("/", controllers.put);
router.delete("/", controllers.delete);

module.exports = router;

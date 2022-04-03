const express = require("express");
const router = express.Router();
const controllers = require("../controllers/fish/board");

router.get("/board", controllers.get);
router.post("/board", controllers.post);
router.put("/board", controllers.put);
router.delete("/board", controllers.delete);

module.exports = router;

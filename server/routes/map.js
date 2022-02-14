const express = require("express");
const router = express.Router();
const controllers = require("../controllers/map/map");

/* GET map listing. */
router.get("/", controllers.get);
router.post("/", controllers.post);
router.patch("/", controllers.patch);
router.delete("/", controllers.delete);

module.exports = router;

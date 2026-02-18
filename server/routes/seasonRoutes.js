const express = require("express");
const router = express.Router();
const seasonController = require("../controllers/seasonController");
router.get("/:id", seasonController.getSeasonById);
module.exports = router;

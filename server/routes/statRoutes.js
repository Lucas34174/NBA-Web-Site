const express = require("express");
const router = express.Router();
const statController = require("../controllers/statController");
router.get("/avgPoints", statController.getAvgPoints);
router.get("/sumMatch", statController.getSumMatch);

module.exports = router;

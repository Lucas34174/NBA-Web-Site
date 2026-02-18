const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
router.get("/team", pageController.getTeamPage);
module.exports = router;

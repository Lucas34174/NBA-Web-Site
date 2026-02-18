const express = require("express");
const router = express.Router();
const navbarController = require("../controllers/navbarController");
router.get("/player", navbarController.getNavbarPlayer);
module.exports = router;

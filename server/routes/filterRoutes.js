const express = require("express");
const { getFilterByCity } = require("../controllers/filterController");
const router = express.Router();

router.get("/city", getFilterByCity);
module.exports = router;

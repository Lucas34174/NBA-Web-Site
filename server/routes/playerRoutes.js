const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/number", playerController.getPlayerCount);
router.get("/longSeason", playerController.getPlayerLongSeason);
router.get("/:name", playerController.getPlayerByName);
router.get("/:name/radar", playerController.getPlayerRadarByName);
router.get("/:playerName/:season/stats", playerController.getPlayerSeasonStat);
router.get("/:playerName/season", playerController.getPlayerSeasons);
router.get("/:name/:season", playerController.getPlayerSeason);

module.exports = router;

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

router.get("/number", gameController.getGameNumber);
router.get("/season", gameController.getGameSeasons);
router.get("/totalpoint", gameController.getGameTotalpoint);
router.get("/history", gameController.getGameHistory);
router.get("/maxscores", gameController.getGameMaxscores);
router.get("/bigDifference", gameController.getGameBigDifference);
router.get("/:id", gameController.getGameByTeamId);

module.exports = router;

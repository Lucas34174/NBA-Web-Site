const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");

router.get("/", teamController.getAllTeams);
router.get("/:id", teamController.getTeamById);
router.get("/number", teamController.getTeamsNumber);
router.get("/greatest", teamController.getGreatestTeam);
router.get("/:id", teamController.getTeamById);
router.get("/:id/details", teamController.getTeamdetails);
router.get("/:id/history", teamController.getTeamHistory);
router.get("/:id/stats", teamController.getTeamStats);
router.get("/:id/lastgame", teamController.getTeamLastGame);
router.get("/:abbr/:season/player", teamController.getTeamSeasonPlayers);
router.get("/:team/:season/stats", teamController.getTeamSeasonStats);
// router.get("/:abbr/:season/player", teamController.getTeamSeasonPlayers);

module.exports = router;

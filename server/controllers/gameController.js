const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getGameNumber = asyncHandler(async (req, res) => {
  const q = "SELECT COUNT(*) as game_num FROM game";
  const [result] = await db.query(q);
  res.send(result);
});

exports.getGameSeasons = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      MIN(SUBSTR(season_id, 2)) as first_season,
      MAX(SUBSTR(season_id, 2)) as last_season
    FROM game`;
  const [result] = await db.query(q);
  res.send(result);
});

exports.getGameTotalpoint = asyncHandler(async (req, res) => {
  const q = `
    SELECT SUM(pts_home + pts_away) as total_point
    FROM game`;
  const [result] = await db.query(q);
  res.send(result);
});

exports.getGameHistory = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      g.game_id,
      g.game_date,
      g.team_name_home,
      g.team_name_away,
      SUBSTR(g.season_id, 2, 5) as season,
      g.team_abbreviation_home,
      g.team_abbreviation_away,
      g.pts_home,
      g.pts_away,
      g.wl_home,
      g.season_type
    FROM game g
    WHERE DATE_FORMAT(g.game_date, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')
    ORDER BY (g.pts_home + g.pts_away) DESC
    LIMIT 1;
  `;
  const [result] = await db.query(q);
  res.send(result[0]);
});

exports.getGameMaxscores = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      g.game_id,
      g.game_date,
      g.team_name_home,
      g.team_name_away,
      SUBSTR(g.season_id, 2, 5) as season_id,
      g.team_abbreviation_home,
      g.team_abbreviation_away,
      g.pts_home,
      g.pts_away,
      g.wl_home,
      g.season_type,
      (g.pts_home + g.pts_away) as speci
    FROM game g
    ORDER BY speci DESC
    LIMIT 1`;
  const [result] = await db.query(q);
  res.send(result[0]);
});

exports.getGameBigDifference = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      g.game_id,
      g.game_date,
      g.team_name_home,
      g.team_name_away,
      SUBSTR(g.season_id, 2, 5) as season,
      g.team_abbreviation_home,
      g.team_abbreviation_away,
      g.pts_home,
      g.pts_away,
      g.wl_home,
      g.season_type,
      ABS(g.pts_home - g.pts_away) as speci
    FROM game g
    ORDER BY speci DESC
    LIMIT 1`;
  const [result] = await db.query(q);
  res.send(result[0]);
});

exports.getGameByTeamId = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      game_id,
      game_date,
      team_name_home,
      team_name_away,
      SUBSTR(season_id, 2, 5) as season_id,
      team_abbreviation_home,
      team_abbreviation_away,
      pts_home,
      pts_away,
      wl_home,
      season_type,
      (pts_home + pts_away) as speci
    FROM game
    WHERE team_id_home = ? OR team_id_away = ?
    ORDER BY game_date DESC;
  `;
  const { id } = req.params;
  const [result] = await db.query(q, [id, id]);
  res.send(result);
});

const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getAvgPoints = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      SUBSTR(season_id, 2, 4) AS season,
      AVG(pts_home + pts_away) as total_points,
      AVG(pts_home) as home_points,
      AVG(pts_away) as away_points,
      COUNT(*) as match_num
    FROM game
    WHERE SUBSTR(season_id, 1, 1) = 2
    GROUP BY season_id`;

  const [result] = await db.query(q);

  const data = {
    season: result.map((r) => r.season),
    total_points: result.map((r) => r.total_points),
    home_points: result.map((r) => r.home_points),
    away_points: result.map((r) => r.away_points),
    match_num: result.map((r) => r.match_num),
  };

  res.send(data);
});

exports.getSumMatch = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      SUBSTR(season_id, 2, 4) AS season,
      COUNT(*) as match_num
    FROM game
    WHERE SUBSTR(season_id, 1, 1) = 2
    GROUP BY season_id`;

  const [result] = await db.query(q);

  const data = {
    season: result.map((r) => r.season),
    match_num: result.map((r) => r.match_num),
  };

  res.send(data);
});

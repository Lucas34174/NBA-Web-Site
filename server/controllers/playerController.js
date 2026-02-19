const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getPlayerByName = asyncHandler(async (req, res) => {
  const q = `
    SELECT *
    FROM common_player_info
    WHERE display_first_last = ?`;
  const [result] = await db.query(q, [req.params.name]);
  res.send(result[0]);
});

exports.getPlayerRadarByName = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      player_name,
      pts,
      ast,
      reb,
      ts_pct,
      usg_pct,
      net_rating,
      season
    FROM players_season_stats
    WHERE player_name = ? 
    ORDER BY pts DESC
    LIMIT 1`;
  const [result] = await db.query(q, [req.params.name]);
  res.send(result[0]);
});

exports.getPlayerSeasonStat = asyncHandler(async (req, res) => {
  const { playerName, season } = req.params;

  if (season === "all") {
    const q = `
      SELECT 
        player_name,
        SUM(gp) AS gp,
        AVG(pts) AS pts,
        AVG(reb) AS reb,
        AVG(ast) AS ast,
        AVG(ts_pct) AS ts_pct,
        AVG(usg_pct) AS usg_pct,
        AVG(ast_pct) AS ast_pct,
        AVG(oreb_pct) AS oreb_pct,
        AVG(dreb_pct) AS dreb_pct,
        AVG(net_rating) AS net_rating
      FROM players_season_stats
      WHERE player_name = ?;
    `;
    const [result] = await db.query(q, [playerName]);
    res.send(result[0]);
  } else {
    const q = `
      SELECT *
      FROM players_season_stats
      WHERE season = ?
        AND player_name = ?;
    `;
    const [result] = await db.query(q, [season, playerName]);
    res.send(result[0]);
  }
});

exports.getPlayerSeasons = asyncHandler(async (req, res) => {
  const { playerName } = req.params;
  const q = `
    SELECT season 
    FROM players_season_stats 
    WHERE player_name = ?`;
  const [result] = await db.query(q, [playerName]);

  const season = result.map((r) => r.season).reverse();
  res.send(season);
});

exports.getPlayerSeason = asyncHandler(async (req, res) => {
  const { name, season } = req.params;

  if (season === "all") {
    const q = `
      SELECT 
        player_name,
        AVG(pts) AS pts,
        AVG(ast) AS ast,
        AVG(reb) AS reb,
        AVG(ts_pct) AS ts_pct,
        AVG(usg_pct) AS usg_pct,
        AVG(net_rating) AS net_rating
      FROM players_season_stats
      WHERE player_name = ?;
    `;
    const [result] = await db.query(q, [name]);
    res.send(result[0]);
  } else {
    const q = `
      SELECT 
        player_name,
        pts,
        ast,
        reb,
        ts_pct,
        usg_pct,
        net_rating,
        season
      FROM players_season_stats
      WHERE player_name = ? 
        AND season = ?;
    `;
    const [result] = await db.query(q, [name, season]);
    res.send(result[0]);
  }
});

exports.getPlayerCount = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      COUNT(*) as player_num,
      SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as actif,
      SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactif
    FROM player`;
  const [result] = await db.query(q);
  console.log("getPlayerCount" + result);
  res.send(result);
});

exports.getPlayerLongSeason = asyncHandler(async (req, res) => {
  const q = `
    SELECT 
      person_id,
      first_name,
      last_name,
      country,
      height,
      weight,
      season_exp,
      team_name,
      team_abbreviation,
      position
    FROM common_player_info
    ORDER BY season_exp DESC
    LIMIT 1`;
  const [result] = await db.query(q);
  res.send(result[0]);
});

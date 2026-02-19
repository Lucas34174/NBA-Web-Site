const db = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");

exports.getAllTeams = asyncHandler(async (req, res) => {
  const [result] = await db.query("SELECT id, full_name FROM team");
  res.send(result);
});

exports.getTeamById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const q = `
  SELECT 
      team_id,
      nickname,
      abbreviation,
      yearfounded,
      city,
      arena,
      arenacapacity,
      generalmanager,
      owner,
      headcoach
    FROM team_details
    WHERE team_id = ?`;
  const [result] = await db.query(q, [id, id]);
  res.send(result[0]);
});

exports.getTeamsNumber = asyncHandler(async (req, res) => {
  const q = "SELECT COUNT(*) as team_num FROM team";
  const [result] = await db.query(q);
  res.send(result);
});

exports.getGreatestTeam = asyncHandler(async (req, res) => {
  const q = `
  SELECT 
    g.team_id,
    SUM(g.pts) as points 
  FROM (
      SELECT team_id_home as team_id, SUM(pts_home) as pts 
      FROM game
      GROUP BY team_id_home
      UNION ALL
      SELECT team_id_away as team_id, SUM(pts_away) as pts 
      FROM game
      GROUP BY team_id_away 
  ) as g
  LEFT JOIN team t 
  ON g.team_id = t.id 
  GROUP BY g.team_id
  ORDER BY points DESC
  LIMIT 1;`;
  const [result] = await db.query(q);
  res.send(result[0]);
});

exports.getTeamdetails = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT 
      t.id,
      t.full_name,
      t.abbreviation,
      t.nickname,
      t.city,
      t.state,
      t.year_founded,
      td.arena,
      td.arenacapacity,
      td.owner,
      td.generalmanager,
      td.headcoach,
      td.dleagueaffiliation,
      td.facebook,
      td.instagram,
      td.twitter
    FROM team t
    LEFT JOIN team_details td ON t.id = td.team_id
    WHERE t.id = ?;
  `;
  const [result] = await db.query(q, [id]);
  res.send(result[0]);
});

exports.getTeamHistory = asyncHandler(async (req, res) => {
  const q = `
  SELECT 
    team_id,
    city,
    nickname,
    year_founded,
    year_active_till
  FROM team_history
  WHERE team_id = ?
  ORDER BY year_founded ASC;`;
  const [result] = await db.query(q, [req.params.id]);
  res.send(result);
});

exports.getTeamStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const q = `
    SELECT 
      SUM(
        (team_id_home = ? AND wl_home = 'W') OR
        (team_id_away = ? AND wl_away = 'W')
      ) AS total_wins,

      SUM(
        (team_id_home = ? AND wl_home = 'L') OR
        (team_id_away = ? AND wl_away = 'L')
      ) AS total_losses,

      SUM(team_id_home = ? AND wl_home = 'W') AS home_wins,
      SUM(team_id_home = ? AND wl_home = 'L') AS home_losses,

      SUM(team_id_away = ? AND wl_away = 'W') AS away_wins,
      SUM(team_id_away = ? AND wl_away = 'L') AS away_losses,

      AVG(
        CASE
          WHEN team_id_home = ? THEN pts_home
          WHEN team_id_away = ? THEN pts_away
        END
      ) AS avg_points_scored,

      AVG(
        CASE
          WHEN team_id_home = ? THEN pts_away
          WHEN team_id_away = ? THEN pts_home
        END
      ) AS avg_points_allowed,

      COUNT(*) AS total_games
    FROM game
    WHERE team_id_home = ? OR team_id_away = ?;
  `;
  const params = [
    id,
    id, // total_wins
    id,
    id, // total_losses
    id, // home_wins
    id, // home_losses
    id, // away_wins
    id, // away_losses
    id,
    id, // avg_points_scored
    id,
    id, // avg_points_allowed
    id,
    id, // WHERE
  ];

  const [result] = await db.query(q, params);
  res.send(result[0]);
});

exports.getTeamLastGame = asyncHandler(async (req, res) => {
  const q = `
  SELECT 
    game_id,
    game_date,
    team_name_home,
    team_name_away,
    SUBSTR(season_id, 2, 5) as season,
    team_abbreviation_home,
    team_abbreviation_away,
    pts_home,
    pts_away,
    wl_home,
    season_type,
    (pts_home + pts_away) as speci
  FROM game 
  WHERE (team_id_away = ? OR team_id_home = ?) AND season_type = 'Regular season' 
  ORDER BY game_date DESC 
  LIMIT 20;
  `;
  const { id } = req.params;
  const [result] = await db.query(q, [id, id]);
  res.send(result);
});

exports.getTeamSeasonPlayers = asyncHandler(async (req, res) => {
  const { abbr, season } = req.params;
  const q = `
SELECT DISTINCT
    pss.player_name,
    cp.first_name,
    cp.last_name,
    cp.position,
    pss.player_height,
    pss.player_weight,
    cp.jersey,
    pss.country,
    pss.gp,
    pss.pts,
    pss.reb,
    pss.ast,
    pss.net_rating,
    pss.ts_pct,
    pss.ast_pct,
    pss.oreb_pct,
    pss.dreb_pct,
    pss.age
FROM players_season_stats pss
LEFT JOIN common_player_info cp
  ON CONCAT(cp.first_name, ' ', cp.last_name)
     COLLATE utf8mb4_0900_ai_ci
     = pss.player_name
     COLLATE utf8mb4_0900_ai_ci
WHERE pss.season = ?
  AND pss.team_abbreviation = ?;`;
  const [result] = await db.query(q, [season, abbr]);
  res.send(result);
});

exports.getTeamSeasonStats = asyncHandler(async (req, res) => {
  const { team, season } = req.params;
  const q = `
  SELECT *
  FROM teams_season_stats
  WHERE season = ?
  AND team LIKE ?;`;
  const [result] = await db.query(q, [season, `%${team}%`]);
  res.send(result[0]);
});

const db = require("../config/db");

exports.getGameNumber = (req, res) => {
  let q = "SELECT count(*)  as game_num FROM game";
  console.log("q: game/number");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    console.log(result);
  });
};

exports.getGameSeasons = (req, res) => {
  let q = `SELECT 
          MIN(SUBSTR(season_id, 2)) as first_season,
          MAX(SUBSTR(season_id, 2)) as last_season
        FROM game`;
  console.log("q: /game/season");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    console.log(result);
  });
};

exports.getGameTotalpoint = (req, res) => {
  let q = `SELECT SUM(pts_home + pts_away) as total_point
FROM game`;
  console.log("q: /game/totalpoint");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    console.log(result);
  });
};

exports.getGameHistory = (req, res) => {
  const q = `SELECT 
  g.game_id,
  g.game_date,
  g.team_name_home,
  g.team_name_away,
  SUBSTR(g.season_id,2,5) as season,
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
  console.log("q: /game/history");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
    console.log(result);
  });
};

exports.getGameMaxscores = (req, res) => {
  const q = `SELECT 
  g.game_id,
  g.game_date,
  g.team_name_home,
  g.team_name_away,
  SUBSTR(g.season_id,2,5) as season_id,
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

  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
  });
};

exports.getGameBigDifference = (req, res) => {
  const q = `SELECT 
  g.game_id,
  g.game_date,
  g.team_name_home,
  g.team_name_away,
  SUBSTR(g.season_id,2,5) as season,
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
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
  });
};

exports.getGameByTeamId = (req, res) => {
  const q = `
  SELECT 
    game_id,
    game_date,
    team_name_home,
    team_name_away,
    SUBSTR(season_id,2,5) as season,
    team_abbreviation_home,
    team_abbreviation_away,
    pts_home,
    pts_away,
    wl_home,
    season_type,
    (pts_home + pts_away) as speci
  FROM game
  WHERE team_id_home = ? or team_id_away = ?
  ORDER BY game_date desc;
  `;
  const id = req.params.id;
  db.query(q, [id, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    // console.log(result);
  });
};

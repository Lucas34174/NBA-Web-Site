const db = require("../config/db");
exports.getPlayerByName = (req, res) => {
  const q = `
  SELECT *
  FROM common_player_info
  WHERE display_first_last = ?`;
  const name = req.params.name;
  db.query(q, [name], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
    console.log(result[0]);
  });
};

exports.getPlayerRadarByName = (req, res) => {
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
  LIMIT 1
  `;
  const name = req.params.name;
  db.query(q, [name], (err, result) => {
    if (err) console.log(err);
    res.send(result[0]);
    console.log(result[0]);
  });
};

exports.getPlayerSeasonStat = (req, res) => {
  const playerName = req.params.playerName;
  const season = req.params.season;
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
    db.query(q, [playerName], (err, result) => {
      if (err) {
        console.error(err);
      }
      res.send(result[0]);
      console.log(result[0]);
    });
  } else {
    const q = `
      SELECT *
      FROM players_season_stats
      WHERE season = ?
        AND player_name = ?;
    `;
    db.query(q, [season, playerName], (err, result) => {
      if (err) {
        console.error(err);
      }
      res.send(result[0]);
      console.log(result[0]);
    });
  }
};

exports.getPlayerSeasons = (req, res) => {
  const playerName = req.params.playerName;
  const q = `
  select 
    season 
  from players_season_stats 
  where player_name= ?
  `;
  db.query(q, [playerName], (err, result) => {
    if (err) {
      console.error(err);
    }
    let season = [];
    for (let i = 0; i < result.length; i++) {
      season.unshift(result[i].season);
    }
    res.send(season);
    console.log(season);
  });
};

exports.getPlayerSeason = (req, res) => {
  const name = req.params.name;
  const season = req.params.season;

  if (season === "all") {
    // Agrégation sur toutes les saisons
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
    db.query(q, [name], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur serveur");
      }
      res.send(result[0]);
      console.log(result[0]);
    });
  } else {
    // Stats pour une saison spécifique
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
    db.query(q, [name, season], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Erreur serveur");
      }
      res.send(result[0]);
      console.log(result[0]);
    });
  }
};

exports.getPlayerCount = (req, res) => {
  let q = `SELECT COUNT(*) as player_num,
          SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) as actif,
          SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) as inactif
        FROM player`;
  console.log("q: player/number");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    console.log(result);
  });
};

exports.getPlayerLongSeason = (req, res) => {
  const q = `SELECT 
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
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
  });
};

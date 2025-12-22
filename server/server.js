const db = require("./db");
const cors = require("cors");
const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); //permettre la requete vers une autre port
app.use(express.json());

const port = 7000;

// db.query("Select * from team", (err, result) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(result);
// });

app.listen(port, "localhost", () => {
  //démarre le serveur
  console.log("server is listen on port " + port + " now...");
});
app.get("/team", (req, res) => {
  db.query("SELECT id,full_name FROM team", (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
});

app.get("team/:id", (req, res) => {
  let q = "SELECT * FROM team_details WHERE id=" + req.params.id;
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
  });
});

app.get("/player/number", (req, res) => {
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
});

app.get("/team/number", (req, res) => {
  let q = "SELECT count(*)  as team_num FROM team";
  console.log("q: team/number");
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/game/number", (req, res) => {
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
});

app.get("/game/season", (req, res) => {
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
});

app.get("/game/totalpoint", (req, res) => {
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
});

app.get("/game/history", (req, res) => {
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
});

app.get("/game/maxscores", (req, res) => {
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
});

app.get("/game/bigDifference", (req, res) => {
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
});

app.get("/player/longSeason", (req, res) => {
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
});

app.get("/team/greatest", (req, res) => {
  const q = `
  SELECT 
g.team_id ,
SUM(g.pts) as points 
FROM(
    SELECT team_id_home as team_id , SUM(pts_home) as pts 
    FROM game
    GROUP BY team_id_home
    UNION ALL
    SELECT team_id_away as team_id , SUM(pts_away) as pts 
    FROM game
    GROUP BY team_id_away 
) as g
LEFT JOIN team  t 
ON g.team_id = t.id 
GROUP BY g.team_id
ORDER BY points DESC
LIMIT 1;`;
  console.log("q: /team/greatest");
  db.query(q, (err, result) => {
    if (err) {
      console.log("err");
    }
    res.send(result[0]);
    console.log(result[0]);
  });
});

app.get("/team/:id", (req, res) => {
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
    WHERE team_id = ?;
  `;
  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
  });
});

app.get("/stat/avgPoints", (req, res) => {
  const q = `
  
  SELECT 
SUBSTR(season_id,2,4) AS season,
AVG(pts_home + pts_away) as total_points,
AVG(pts_home) as home_points,
AVG(pts_away) as away_points,
COUNT(*) as match_num
FROM game
WHERE SUBSTR(season_id,1,1) = 2
GROUP BY season_id`;
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    let season = [];
    let total_points = [];
    let home_points = [];
    let away_points = [];
    let match_num = [];
    for (let i = 0; i < result.length; i++) {
      season.push(result[i].season);
      total_points.push(result[i].total_points);
      home_points.push(result[i].home_points);
      away_points.push(result[i].away_points);
      match_num.push(result[i].match_num);
    }

    const data = {
      season: season,
      total_points: total_points,
      home_points: home_points,
      away_points: away_points,
      match_num: match_num,
    };
    res.send(data);
    console.log(data);
  });
});

app.get("/stat/sumMatch", (req, res) => {
  const q = `
  SELECT 
    SUBSTR(season_id,2,4) AS season,
    COUNT(*) as match_num
  FROM game
  WHERE SUBSTR(season_id,1,1) = 2
  GROUP BY season_id`;
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    let season = [];
    let match_num = [];
    for (let i = 0; i < result.length; i++) {
      season.push(result[i].season);
      match_num.push(result[i].match_num);
    }

    const data = {
      season: season,
      match_num: match_num,
    };
    res.send(data);
    console.log(data);
  });
});

app.get("/page/team", (req, res) => {
  const q = `  
  SELECT 
    team_id,
    abbreviation,
    nickname,
    yearfounded,
    city,
    arena,
    arenacapacity,
    owner,
    generalmanager,
    headcoach
  FROM team_details;`;
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/filter/city", (req, res) => {
  const q = `SELECT distinct city from team;`;
  db.query(q, (err, result) => {
    if (err) console.log(err);
    let city = [];
    result.map((team) => city.push(team["city"]));
    const data = JSON.stringify(city);
    res.send(data);
    console.log(data);
  });
});

app.get("/team/:id/details", async (req, res) => {
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
  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result[0]);
  });
});

app.get("/team/:id/history", (req, res) => {
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
  let id = req.params.id;
  db.query(q, [id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});
app.get("/team/:id/stats", (req, res) => {
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

  db.query(q, params, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    console.log(result[0]);
    res.send(result[0]);
  });
});

app.get("/team/:id/lastgame", (req, res) => {
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
    (pts_home+pts_away) as speci
  FROM game 
  WHERE (team_id_away= ? or team_id_home= ? ) and season_type='Regular season' 
  order by game_date desc limit 20;
  `;
  const id = req.params.id;
  db.query(q, [id, id], (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});

app.get("/game/:id", (req, res) => {
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
});

app.get("/season/:id", (req, res) => {
  const id = req.params.id;
  const q = `SELECT distinct SUBSTR(season_id,2,5) as season from game WHERE team_id_home = ? OR team_id_away = ? order by SUBSTR(season_id,2,5) desc;`;
  db.query(q, [id, id], (err, result) => {
    if (err) console.log(err);
    let season = [];
    result.map((game) => season.push(game["season"]));
    const data = JSON.stringify(season);
    res.send(data);
    console.log(data);
  });
});

app.get("/team/:abbr/:season/player", (req, res) => {
  const abbr = req.params.abbr;
  const season = req.params.season;
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
  db.query(q, [season, abbr], (err, result) => {
    if (err) console.log(err);
    res.send(result);
    console.log(result);
  });
});

app.get("/team/:team/:season/stats", (req, res) => {
  const team = req.params.team;
  const season = req.params.season;
  const q = `
SELECT *
FROM teams_season_stats
WHERE season = ?
  AND team LIKE ?;`;
  db.query(q, [season, `%${team}%`], (err, result) => {
    if (err) console.log(err);
    res.send(result[0]);
    console.log(result[0]);
  });
});

app.get("/player/:name", (req, res) => {
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
});

app.get("/player/:name/radar", (req, res) => {
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
});

app.get("/player/:playerName/:season/stats", (req, res) => {
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
});

app.get("/player/:playerName/season", (req, res) => {
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
});

app.get("/player/:name/:season", (req, res) => {
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
});

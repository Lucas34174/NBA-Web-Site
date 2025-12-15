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
  const id = req.params.id;
  // console.log("id greatest: " + id);
  const q = `
  SELECT 
    team_id,
    nickname,
    abbreviation,
    yearfounded,
    city,
    arena,
    arenacapacity,
    owner,
    headcoach
  FROM team_details
  WHERE team_id = ${id}`;
  db.query(q, (err, result) => {
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

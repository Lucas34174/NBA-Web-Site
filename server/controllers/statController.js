const db = require("../config/db");

exports.getAvgPoints = (req, res) => {
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
};

exports.getSumMatch = (req, res) => {
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
};

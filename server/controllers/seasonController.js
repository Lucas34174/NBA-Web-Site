const db = require("../config/db");
exports.getSeasonById = (req, res) => {
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
};

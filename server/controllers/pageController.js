const db = require("../config/db");

exports.getTeamPage = (req, res) => {
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
};

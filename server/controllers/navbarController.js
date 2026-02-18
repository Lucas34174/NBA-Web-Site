const db = require("../config/db");

exports.getNavbarPlayer = (req, res) => {
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
    position,
    jersey
  FROM common_player_info
  `;
  db.query(q, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    console.log("NAVBAR");
    console.log(result);
  });
};
